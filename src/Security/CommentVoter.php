<?php

namespace App\Security;

use App\Entity\Comment;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class CommentVoter extends Voter
{
    public const DELETE = 'delete_comment';

    protected function supports($attribute, $subject): bool
    {
        return $attribute === self::DELETE && $subject instanceof Comment;
    }

    protected function voteOnAttribute($attribute, $comment, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // Si l'utilisateur n'est pas connecté, il ne peut rien faire
        if (!$user instanceof User) {
            return false;
        }

        // Vérifie que l'utilisateur est bien l'auteur du commentaire
        return $this->canDelete($comment, $user);
    }

    private function canDelete(Comment $comment, User $user): bool
    {
        return $comment->getCreatedBy() === $user;
    }
}
