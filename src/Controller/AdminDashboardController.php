<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminDashboardController extends AbstractController
{
    #[Route('/admin/dashboard', name: 'admin_dashboard')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        // Récupérer les utilisateurs
        $users = $entityManager->getRepository(User::class)->findAll();
        // Récupérer les articles
        $articles = $entityManager->getRepository(Article::class)->findAll();

        return $this->render('admin_dashboard/dashboard.html.twig', [
            'users'    => $users,
            'articles' => $articles,
        ]);
    }
}
