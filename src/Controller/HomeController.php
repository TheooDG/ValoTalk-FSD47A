<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function home(ArticleRepository $articleRepository, Security $security): Response
    {
        // Récupère les 5 derniers articles publiés
        $latestArticles = $articleRepository->findBy([], ['createdAt' => 'DESC'], 5);

        // Récupère les derniers articles de l'utilisateur connecté
        $user         = $security->getUser();
        $userArticles = [];

        if ($user) {
            $userArticles = $articleRepository->findBy(['createdBy' => $user], ['createdAt' => 'DESC'], 5);
        }

        return $this->render('home/index.html.twig', [
            'latestArticles' => $latestArticles,
            'userArticles'   => $userArticles,
        ]);
    }
}
