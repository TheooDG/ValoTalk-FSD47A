PHP_CONTAINER?=docker exec -it valotalk-project-php
PHP=$(PHP_CONTAINER) php
SF_CONSOLE=$(PHP) bin/console

#----> DOCKER UTILS
DOCKER_COMPOSE=docker-compose
COPY=cp
ifeq (,$(shell command -v "docker-compose" 2> /dev/null))
	DOCKER_COMPOSE=docker compose
	COPY=copy
endif

#----> SERVER UTILS
## Build the project for the first time
first-build:
	$(COPY) .env .env.local
	$(MAKE) build
	$(MAKE) start
	$(MAKE) install
	$(MAKE) dbreset

## Build the project
build:
	$(DOCKER_COMPOSE) build

## Start the project
start:
	$(DOCKER_COMPOSE) up -d

## Stop the project
stop:
	$(DOCKER_COMPOSE) down

## Restart the project
restart: stop start


#----> SYMFONY UTILS
## Install dependencies
install:
	$(MAKE) composer cmd="install --optimize-autoloader"

require:
	$(MAKE) composer cmd="require $(package)"

## Update dependencies
update:
	$(MAKE) composer cmd="update --optimize-autoloader"

composer:
	$(PHP_CONTAINER) composer $(cmd)

cc:
	$(SF_CONSOLE) cache:clear

bash:
	$(PHP_CONTAINER) bash

#----> DATABASE UTILS
.PHONY:dbstart
## start the database
dbstart: dbcreate dbmigrate dbfixtures #dbtriggers

.PHONY:dbreset
## reset the database
dbreset: dbdrop dbstart

dbmigrate:
	$(SF_CONSOLE) doctrine:migration:migrate -n -q --all-or-nothing

.PHONY:dbmigratedown
## rollback a database migration
dbmigratedown:
	$(SF_CONSOLE) doctrine:migration:execute $(f) --down -n

.PHONY:dbmigrateup
## run a given database migration
dbmigrateup:
	$(SF_CONSOLE) doctrine:migration:execute $(f) -n

dbdiff:
	$(SF_CONSOLE) doctrine:migration:diff -n

dbgen:
	$(SF_CONSOLE) doctrine:migration:generate -n

dbstatus:
	$(SF_CONSOLE) doctrine:migration:status

dbcreate:
	$(SF_CONSOLE) doctrine:database:create

## drop the database
dbdrop:
	$(SF_CONSOLE) doctrine:database:drop --force --if-exists

## validate database schema
dbvalidate:
	$(SF_CONSOLE) doctrine:schema:validate

dbfixtures:
	$(SF_CONSOLE) doctrine:fixture:load -n

#dbtriggers:
#	$(SF_CONSOLE) triggers:update

#----> Linting UTILS
lint: lint-install
	$(PHP_CONTAINER) tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --using-cache=no --config=.php-cs-fixer.dist.php `git status --porcelain | sed '/^D/d' | sed s/^...// | sed 's/^.* -> //' | grep '.php'`

lint-install:
	@[ -f ./tools/php-cs-fixer/vendor/bin/php-cs-fixer ] && echo "linter is already installed" || cmd="install -o --working-dir=tools/php-cs-fixer" $(MAKE) composer