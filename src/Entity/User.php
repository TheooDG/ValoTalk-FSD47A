<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints\Email;

#[ORM\Entity]
#[ORM\Table('user')]
class User extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column('id', type: 'bigint')]
    protected $id;

    #[ORM\Column('username', type: 'string')]
    private string $username;

    #[ORM\Column('email', type: 'string')]
    #[Email]
    private string $email;

    #[ORM\Column('password', type: 'string')]
    private string $password;

    #[ORM\Column('roles', type: 'json')]
    private array $roles = [];

    #[ORM\Column('birthdate', type: 'datetime')]
    private ?\DateTime $birthdate;

    public function __construct(string $username = '', string $email = '', string $password ='', \DateTime $birthdate = null)
    {
        $this->username  = $username;
        $this->email     = $email;
        $this->password  = $password;
        $this->birthdate = $birthdate;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password;

        return $this;
    }

    public function getRoles(): array
    {
        $roles   = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    public function getBirthdate(): ?\DateTime
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTime $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function eraseCredentials(): void
    {
        // supprime les données sensibles ne devant pas être conservées trop longtemps. Format : $this->var = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }
}
