<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

abstract class AbstractEntity
{
    use TimestampableEntity;

    /**
     * @ORM\Id
     *
     * @ORM\GeneratedValue
     *
     * @ORM\Column(type="integer")
     */
    protected $id;

    #[ORM\Column(type: 'datetime', nullable: true)]
    protected $deletedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isStored(): bool
    {
        return null !== $this->id;
    }

    public function getDeletedAt(): ?\DateTimeInterface
    {
        return $this->deletedAt;
    }

    public function setDeletedAt(?\DateTimeInterface $deletedAt): self
    {
        if ($this->deletedAt?->getTimestamp() !== $deletedAt?->getTimestamp()) {
            $this->deletedAt = $deletedAt;
        }

        return $this;
    }
}
