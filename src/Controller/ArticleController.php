<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Agent;
use App\Form\ArticleForm;
use App\Form\EditArticleForm;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
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
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    #[Route('/article/new', name: 'article_new')]
    public function new(Request $request): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleForm::class, $article);

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
            'form' => $form->createView(),
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
}
