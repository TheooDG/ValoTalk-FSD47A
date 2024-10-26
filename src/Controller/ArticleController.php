<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Comment;
use App\Form\ArticleForm;
use App\Form\EditArticleForm;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ArticleController extends AbstractController
{
    private $security;
    private $entityManager;

    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security      = $security;
        $this->entityManager = $entityManager;
    }

    #[Route('/article/new', name: 'article_new')]
    public function new(Request $request): Response
    {
        $article = new Article();
        $form    = $this->createForm(ArticleForm::class, $article);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $currentUser = $this->security->getUser();

            if ($currentUser) {
                $article->setCreatedBy($currentUser);
            } else {
                // Gérer le cas où l'utilisateur n'est pas connecté
                return $this->redirectToRoute('login');
            }

            $this->entityManager->persist($article);
            $this->entityManager->flush();

            return $this->redirectToRoute('home');
        }

        return $this->render('article/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/articles', name: 'article_list.scss')]
    public function index(ArticleRepository $articleRepository): Response
    {
        $articles = $articleRepository->findAll();

        return $this->render('article/articles.html.twig', [
            'articles' => $articles,
        ]);
    }

    #[Route('/article/{id}', name: 'article_show')]
    public function show(Article $article): Response
    {
        return $this->render('article/show.html.twig', [
            'article' => $article,
        ]);
    }

    #[Route('/article/{id}/edit', name: 'article_edit')]
    public function edit(Request $request, Article $article, EntityManagerInterface $entityManager): Response
    {
        // Vérifie si l'utilisateur connecté est le propriétaire de l'article
        $this->denyAccessUnlessGranted('edit', $article);

        $form = $this->createForm(EditArticleForm::class, $article);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('article_show', ['id' => $article->getId()]);
        }

        return $this->render('article/edit.html.twig', [
            'form'    => $form->createView(),
            'article' => $article,
        ]);
    }

    #[Route('/article/{id}/delete', name: 'article_delete', methods: ['POST'])]
    public function delete(Request $request, Article $article, EntityManagerInterface $entityManager): RedirectResponse
    {
        // Vérifie si l'utilisateur connecté est le propriétaire de l'article
        $this->denyAccessUnlessGranted('delete', $article);

        if ($this->isCsrfTokenValid('delete' . $article->getId(), $request->request->get('_token'))) {
            $entityManager->remove($article);
            $entityManager->flush();

            $this->addFlash('success', 'L\'article a été supprimé avec succès.');
        }

        dump('Avant redirection');

        return $this->redirectToRoute('user_profile', ['id' => $this->getUser()->getId()]);
    }

    #[Route('/article/{id}/comment', name: 'article_comment', methods: ['POST'])]
    public function comment(Request $request, Article $article): Response
    {
        // Vérifie si l'utilisateur est connecté
        if (!$this->getUser()) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        // Récupère le contenu du commentaire
        $content = $request->request->get('content');

        // Crée un nouvel objet Comment
        $comment = new Comment();
        $comment->setContent($content);
        $comment->setCreatedBy($this->getUser());
        $comment->setArticle($article);

        try {
            $this->entityManager->persist($comment);
            $this->entityManager->flush();

            // Réponse JSON succès
            return new JsonResponse([
                'success'   => true,
                'commentId' => $comment->getId(),
                'username'  => $this->getUser()->getUsername(),
            ]);
        } catch (\Exception $e) {
            // Réponse JSON erreur
            return new JsonResponse(['error' => 'Une erreur est survenue lors de l\'ajout du commentaire.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/article/{id}/comment/{commentId}/delete', name: 'comment_delete', methods: ['DELETE'])]
    public function deleteComment(
        Article $article,
        int $commentId,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $comment = $entityManager->getRepository(Comment::class)->find($commentId);

        if (!$comment || $comment->getArticle() !== $article) {
            return new JsonResponse(['error' => 'Comment not found'], Response::HTTP_NOT_FOUND);
        }

        if (!$this->isGranted('delete_comment', $comment)) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        try {
            $entityManager->remove($comment);
            $entityManager->flush();

            return new JsonResponse(['success' => true]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Une erreur est survenue lors de la suppression.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
