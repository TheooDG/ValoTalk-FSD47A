<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Constraints\Email;

#[ORM\Entity]
#[ORM\Table('app_user')]
class User extends AbstractEntity implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column('id', type: 'bigint')]
    protected $id;

    #[ORM\Column('username', type: 'string')]
    private string $username;

    #[ORM\Column('email', type: 'string')]
    #[Assert\NotBlank]
    #[Email]
    private string $email;

    #[ORM\Column('password', type: 'string')]
    private string $password;

    #[ORM\Column('roles', type: 'json')]
    private array $roles = [];

    #[ORM\Column('birthdate', type: 'datetime', nullable: true)]
    private ?\DateTime $birthdate;

    #[ORM\Column('created_at', type: 'datetime')]
    protected $createdAt;

    #[ORM\Column('updated_at', type: 'datetime')]
    protected $updatedAt;

    /**
     * @var Collection<int, Article>
     */
    #[ORM\OneToMany(targetEntity: Article::class, mappedBy: 'createdBy')]
    private Collection $articles;

    /**
     * @var Collection<int, Comment>
     */
    #[ORM\OneToMany(targetEntity: Comment::class, mappedBy: 'createdBy')]
    private Collection $comments;

    /**
     * @var Collection<int, Rate>
     */
    #[ORM\OneToMany(targetEntity: Rate::class, mappedBy: 'givenBy')]
    private Collection $rates;

    public function __construct(string $username = '', string $email = '', string $password = '', \DateTime $birthdate = null)
    {
        $this->username = $username;
        $this->email    = $email;
        $this->setPassword($password);
        $this->birthdate = $birthdate;
        $this->roles     = ['ROLE_USER'];
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->articles  = new ArrayCollection();
        $this->comments  = new ArrayCollection();
        $this->rates     = new ArrayCollection();
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
        // Hacher le mot de passe avant de le stocker
        $this->password = $password;

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
        // Supprime les données sensibles ne devant pas être conservées trop longtemps. Par exemple :
        // $this->password = null;
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): static
    {
        if (!$this->articles->contains($article)) {
            $this->articles->add($article);
            $article->setCreatedBy($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): static
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getCreatedBy() === $this) {
                $article->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setCreatedBy($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getCreatedBy() === $this) {
                $comment->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Rate>
     */
    public function getRates(): Collection
    {
        return $this->rates;
    }

    public function addRate(Rate $rate): static
    {
        if (!$this->rates->contains($rate)) {
            $this->rates->add($rate);
            $rate->setGivenBy($this);
        }

        return $this;
    }

    public function removeRate(Rate $rate): static
    {
        if ($this->rates->removeElement($rate)) {
            // set the owning side to null (unless already changed)
            if ($rate->getGivenBy() === $this) {
                $rate->setGivenBy(null);
            }
        }

        return $this;
    }
}
