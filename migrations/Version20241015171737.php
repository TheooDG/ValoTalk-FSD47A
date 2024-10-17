<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241015171737 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Supprimer les contraintes de clé étrangère d'abord
        $this->addSql('ALTER TABLE rate DROP CONSTRAINT fk_dfec3f396ebc53ee');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT fk_9474526cb03a8386');

        // Supprimer la séquence et la table "user" si nécessaire
        $this->addSql('DROP SEQUENCE IF EXISTS user_id_seq CASCADE');
        $this->addSql('DROP TABLE IF EXISTS "user" CASCADE');

        // Créer la table app_user
        $this->addSql('CREATE TABLE app_user (id BIGSERIAL NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, birthdate TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');

        // Ajouter les nouvelles contraintes de clé étrangère
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E66B03A8386 FOREIGN KEY (created_by_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CB03A8386 FOREIGN KEY (created_by_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rate ADD CONSTRAINT FK_DFEC3F396EBC53EE FOREIGN KEY (given_by_id) REFERENCES app_user (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // Cette méthode annule les actions de la migration
        $this->addSql('CREATE SCHEMA public');

        // Supprimer les contraintes de clé étrangère
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CB03A8386');
        $this->addSql('ALTER TABLE rate DROP CONSTRAINT FK_DFEC3F396EBC53EE');

        // Recréer la séquence et la table "user"
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE "user" (id BIGSERIAL NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL, birthdate TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');

        // Supprimer la table app_user
        $this->addSql('DROP TABLE app_user');

        // Ajouter les anciennes contraintes de clé étrangère
        $this->addSql('ALTER TABLE article ADD CONSTRAINT fk_23a0e66b03a8386 FOREIGN KEY (created_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE rate ADD CONSTRAINT fk_dfec3f396ebc53ee FOREIGN KEY (given_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT fk_9474526cb03a8386 FOREIGN KEY (created_by_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
