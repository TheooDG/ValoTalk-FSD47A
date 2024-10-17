<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241016130228 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Update existing articles to have a created_by_id (Assurez-vous que l'ID de l'utilisateur existe)
        $this->addSql('UPDATE article SET created_by_id = 14 WHERE created_by_id IS NULL'); // Remplacez 1 par un ID valide d'un utilisateur

        // Set the created_by_id column to NOT NULL
        $this->addSql('ALTER TABLE article ALTER created_by_id SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE article ALTER created_by_id DROP NOT NULL');
    }
}
