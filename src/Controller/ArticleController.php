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

        return $this->render('article/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/articles', name: 'article_list')]
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

        return $this->redirectToRoute('article_list');
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
            // Persiste le commentaire
            $this->entityManager->persist($comment);
            $this->entityManager->flush();

            // Retourne une réponse JSON avec un message de succès
            return new JsonResponse(['message' => 'Commentaire ajouté avec succès.'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            // Retourne une réponse JSON avec un message d'erreur
            return new JsonResponse(['error' => 'Une erreur est survenue lors de l\'ajout du commentaire.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/comment/{id}/delete', name: 'comment_delete', methods: ['DELETE'])]
    public function deleteComment(Comment $comment, EntityManagerInterface $entityManager): Response
    {
        // Vérifie si l'utilisateur est le propriétaire du commentaire
        if ($comment->getCreatedBy() !== $this->getUser()) {
            return new JsonResponse(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
        }

        $entityManager->remove($comment);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Commentaire supprimé avec succès.']);
    }

}
