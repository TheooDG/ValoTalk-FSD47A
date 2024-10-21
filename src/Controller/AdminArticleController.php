<?php

namespace App\Controller;

use App\Entity\Article;
use App\Form\ArticleForm;
use App\Form\EditArticleForm;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminArticleController extends AbstractController
{
    #[Route('/admin/articles/create', name: 'admin_article_create')]
    public function create(Request $request, EntityManagerInterface $entityManager): Response
    {
        $article = new Article();
        $form = $this->createForm(ArticleForm::class, $article);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $article->setCreatedBy($this->getUser());
            $entityManager->persist($article);
            $entityManager->flush();

            $this->addFlash('success', 'Article créé avec succès.');
            return $this->redirectToRoute('admin_dashboard');
        }

        return $this->render('admin_article/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/admin/articles/{id}/edit', name: 'admin_article_edit')]
    public function edit(Request $request, EntityManagerInterface $entityManager, Article $article): Response
    {
        $form = $this->createForm(EditArticleForm::class, $article);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            $this->addFlash('success', 'Article modifié avec succès.');
            return $this->redirectToRoute('admin_dashboard');
        }

        return $this->render('admin_article/edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/admin/articles/{id}/delete', name: 'admin_article_delete', methods: ['POST'])]
    public function delete(EntityManagerInterface $entityManager, Request $request, Article $article): Response
    {
        // Vérification du token CSRF
        if ($this->isCsrfTokenValid('delete' . $article->getId(), $request->request->get('_token'))) {
            $entityManager->remove($article);
            $entityManager->flush();

            $this->addFlash('success', 'Article supprimé avec succès.');
        }

        return $this->redirectToRoute('admin_dashboard');
    }
}
