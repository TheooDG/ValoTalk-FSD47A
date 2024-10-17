<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241017134622 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE rate_id_seq CASCADE');
        $this->addSql('ALTER TABLE rate DROP CONSTRAINT fk_dfec3f397294869c');
        $this->addSql('ALTER TABLE rate DROP CONSTRAINT fk_dfec3f396ebc53ee');
        $this->addSql('DROP TABLE rate');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE rate_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE rate (id INT NOT NULL, given_by_id BIGINT NOT NULL, article_id INT NOT NULL, value INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_dfec3f397294869c ON rate (article_id)');
        $this->addSql('CREATE INDEX idx_dfec3f396ebc53ee ON rate (given_by_id)');
        $this->addSql('ALTER TABLE rate ADD CONSTRAINT fk_dfec3f397294869c FOREIGN KEY (article_id) REFERENCES article (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rate ADD CONSTRAINT fk_dfec3f396ebc53ee FOREIGN KEY (given_by_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
