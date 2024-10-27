<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LegalController extends AbstractController
{
    #[Route('/legal_notice', name: 'legal_notice')]
    public function index(): Response
    {
        return $this->render('legal/notice.html.twig');
    }
}
