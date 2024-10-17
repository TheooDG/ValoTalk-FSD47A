<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/profile/{id}', name: 'user_profile')]
    public function profile(User $user, ArticleRepository $articleRepository): Response
    {
        // Récupérer les articles publiés par l'utilisateur
        $articles = $articleRepository->findBy(['createdBy' => $user]);

        return $this->render('user/profile.html.twig', [
            'user' => $user,
            'articles' => $articles,
        ]);
    }

    #[Route('/admin/users', name: 'user_list')]
    public function list(EntityManagerInterface $entityManager): Response
    {
        $users = $entityManager->getRepository(User::class)->findAll();

        return $this->render('user/list.html.twig', [
            'users' => $users,
        ]);
    }

    #[Route('/admin/users/create', name: 'user_create')]
    public function create(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        // Crée un formulaire ici pour le nouvel utilisateur et gère la soumission

        return $this->render('user/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/admin/users/{id}/edit', name: 'user_edit')]
    public function edit(Request $request, EntityManagerInterface $entityManager, User $user): Response
    {
        // Crée un formulaire ici pour modifier l'utilisateur et gère la soumission

        return $this->render('user/edit.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/admin/users/{id}/delete', name: 'user_delete')]
    public function delete(EntityManagerInterface $entityManager, User $user): Response
    {
        $entityManager->remove($user);
        $entityManager->flush();

        return $this->redirectToRoute('user_list');
    }
}
