<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241016085549 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agent RENAME COLUMN picture TO image');
        $this->addSql('ALTER TABLE article ADD agent_id INT NOT NULL');
        $this->addSql('ALTER TABLE article ADD rating DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE article ADD image VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E663414710B FOREIGN KEY (agent_id) REFERENCES agent (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_23A0E663414710B ON article (agent_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE agent RENAME COLUMN image TO picture');
        $this->addSql('ALTER TABLE article DROP CONSTRAINT FK_23A0E663414710B');
        $this->addSql('DROP INDEX IDX_23A0E663414710B');
        $this->addSql('ALTER TABLE article DROP agent_id');
        $this->addSql('ALTER TABLE article DROP rating');
        $this->addSql('ALTER TABLE article DROP image');
    }
}
