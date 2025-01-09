<?php

// src/Security/UserVoter.php

// src/Security/UserVoter.php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class UserVoter extends Voter
{
    const VIEW = 'view';
    const EDIT = 'edit';
    const DELETE = 'delete';

    protected function supports(string $attribute, $subject): bool
    {
        return $subject instanceof User && in_array($attribute, [self::VIEW, self::EDIT, self::DELETE]);
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $currentUser = $token->getUser();

        // Ne pas autoriser si l'utilisateur n'est pas authentifié
        if (!$currentUser instanceof User) {
            return false;
        }

        switch ($attribute) {
            case self::VIEW:
                return $currentUser === $subject || in_array('ROLE_ADMIN', $currentUser->getRoles());
            case self::EDIT:
                return $currentUser === $subject || in_array('ROLE_ADMIN', $currentUser->getRoles());
            case self::DELETE:
                return $currentUser === $subject || in_array('ROLE_ADMIN', $currentUser->getRoles());
        }

        return false;
    }
}