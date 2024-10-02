<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\Email;

#[ORM\Entity]
#[ORM\Table('user')]
class User extends AbstractEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column('id', type: 'bigint')]
    protected $id;

    #[ORM\Column('email')]
    #[Email]
    private string $email;

    #[ORM\Column('birthdate', type: 'datetime')]
    private ?\DateTime $birthdate;

    public function __construct(string $email, ?\DateTime $birthdate)
    {
        $this->email     = $email;
        $this->birthdate = $birthdate;
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

    public function getBirthdate(): ?\DateTime
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTime $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }
}
