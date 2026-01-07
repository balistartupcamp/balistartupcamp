FROM php:8.3-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    libonig-dev \
    libzip-dev \
    jpegoptim optipng pngquant gifsicle \
    ca-certificates \
    libgmp-dev \
    vim \
    tmux \
    unzip \
    git \
    cron \
    curl


# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gmp
RUN docker-php-ext-configure gd --with-jpeg=/usr/include/ --with-freetype=/usr/include/
RUN docker-php-ext-install gd
RUN pecl install -o -f redis &&  rm -rf /tmp/pear && docker-php-ext-enable redis

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
RUN apt-get install -y nodejs

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/

ENV APACHE_DOCUMENT_ROOT /var/www/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Set Custom php.ini
COPY ./docker/php/php.ini "$PHP_INI_DIR/php.ini"

RUN rm -r /var/www/*

# install laravel
ADD . /var/www/

# Copy directory project permission ke container
RUN chown -R www-data:www-data /var/www

# install deps
RUN composer install && npm install && npm run build

RUN a2enmod rewrite
