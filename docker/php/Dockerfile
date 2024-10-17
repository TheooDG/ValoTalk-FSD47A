FROM php:8.2.6-fpm

RUN apt update \
    && apt install -y zlib1g-dev g++ git libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

# Install Postgre PDO
RUN apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

WORKDIR /var/www/valotalk-project

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV COMPOSER_ALLOW_SUPERUSER 1

EXPOSE 9000

ARG UID=1000
ARG GID=1000
RUN groupadd -o -g $GID local \
    && useradd -rm -d /home/local -s /bin/bash -g $GID -G sudo -u $UID local \
    && chown -R $UID:$GID /var/www
