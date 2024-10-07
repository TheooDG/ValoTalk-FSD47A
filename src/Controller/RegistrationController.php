<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationForm;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    #[Route('/registration', name: 'registration')]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationForm::class, $user);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            // Vérification si le nom d'utilisateur est déjà utilisé
            $existingUserByUsername = $entityManager->getRepository(User::class)->findOneBy(['username' => $data['username']]);

            if ($existingUserByUsername) {
                $this->addFlash('error', 'Ce nom d\'utilisateur est déjà utilisé.');

                return $this->render('registration/index.html.twig', [
                    'registrationForm' => $form->createView(),
                ]);
            }

            // Vérification de l'email
            $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

            if ($existingUser) {
                $this->addFlash('error', 'Cet email est déjà utilisé.');

                return $this->render('registration/index.html.twig', [
                    'registrationForm' => $form->createView(),
                ]);
            }

            // Vérification des mots de passe
            $password        = $data['password'];
            $confirmPassword = $request->get('registration_form')['confirm_password'];

            if ($password !== $confirmPassword) {
                $this->addFlash('error', 'Les mots de passe ne correspondent pas.');

                return $this->render('registration/index.html.twig', [
                    'registrationForm' => $form->createView(),
                ]);
            }

            // Vérification de la date de naissance (doit être dans le passé)
            if ($data['birthdate'] >= new \DateTime()) {
                $this->addFlash('error', 'La date de naissance doit être dans le passé.');

                return $this->render('registration/index.html.twig', [
                    'registrationForm' => $form->createView(),
                ]);
            }

            // Création de l'utilisateur
            $user->setUsername($data['username']);
            $user->setEmail($data['email']);
            $user->setPassword(
                $passwordHasher->hashPassword($user, $data['password'])
            );
            $user->setBirthdate($data['birthdate']);

            // Sauvegarde de l'utilisateur
            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('login');
        }

        return $this->render('registration/index.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }
}
