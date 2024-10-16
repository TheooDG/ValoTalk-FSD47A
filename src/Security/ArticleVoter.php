<?php

namespace App\Security;

use App\Entity\Article;
use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class ArticleVoter extends Voter
{
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function supports($attribute, $subject): bool
    {
        return in_array($attribute, [self::EDIT, self::DELETE])
            && $subject instanceof Article;
    }

    protected function voteOnAttribute($attribute, $article, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // Si l'utilisateur n'est pas connecté, il ne peut rien faire
        if (!$user instanceof User) {
            return false;
        }

        switch ($attribute) {
            case self::EDIT:
                return $this->canEdit($article, $user);
            case self::DELETE:
                return $this->canDelete($article, $user);
        }

        return false;
    }

    private function canEdit(Article $article, User $user): bool
    {
        return $article->getCreatedBy() === $user;
    }

    private function canDelete(Article $article, User $user): bool
    {
        return $article->getCreatedBy() === $user;
    }
}
