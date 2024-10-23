<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ChangePasswordForm;
use App\Form\ProfileEditForm;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/profile/{id}', name: 'user_profile')]
    public function profile(User $user, ArticleRepository $articleRepository): Response
    {
        // Récupérer les articles publiés par l'utilisateur
        $articles = $articleRepository->findBy(['createdBy' => $user]);

        return $this->render('user/profile.html.twig', [
            'user'     => $user,
            'articles' => $articles,
        ]);
    }

    #[Route('/profile/{id}/edit', name: 'user_profile_edit')]
    public function editProfile(Request $request, EntityManagerInterface $entityManager, User $user): Response
    {
        $form = $this->createForm(ProfileEditForm::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('user_profile', ['id' => $user->getId()]);
        }

        return $this->render('user/edit_profile.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/profile/{id}/change-password', name: 'user_change_password')]
    public function changePassword(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, User $user): Response
    {
        $form = $this->createForm(ChangePasswordForm::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $currentPassword = $form->get('currentPassword')->getData();
            $newPassword     = $form->get('plainPassword')->getData();

            // Vérifie si le mot de passe actuel est correct
            if (!$passwordHasher->isPasswordValid($user, $currentPassword)) {
                $this->addFlash('error', 'Le mot de passe actuel est incorrect.');

                return $this->redirectToRoute('user_change_password', ['id' => $user->getId()]);
            }

            // Met à jour le mot de passe
            $user->setPassword($passwordHasher->hashPassword($user, $newPassword));
            $entityManager->flush();

            return $this->redirectToRoute('user_profile', ['id' => $user->getId()]);
        }

        return $this->render('user/change_password.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/profile/{id}/delete', name: 'user_delete_profile')]
    public function deleteProfile(EntityManagerInterface $entityManager, TokenStorageInterface $tokenStorage, User $user): Response
    {
        // Déconnecte l'utilisateur
        $tokenStorage->setToken(null);

        // Supprime l'utilisateur
        $entityManager->remove($user);
        $entityManager->flush();

        // Invalide la session actuelle
        $this->container->get('session')->invalidate();

        // Redirection vers la page d'accueil
        return $this->redirectToRoute('home');
    }
}
