FROM amd64/wordpress:6.0.2-php8.0-apache

# WP CLI install
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN mv wp-cli.phar /usr/local/bin/wp
COPY wp-cli.config.yml /root/.wp-cli/config.yml
RUN echo "alias wp='wp --allow-root'" >> /root/.bashrc

# XDEbUG INSTALL
# Install packages under Debian
RUN apt-get update && \
  apt-get -y install git
# Install XDebug from source as described here:
# https://xdebug.org/docs/install
# Available branches of XDebug could be seen here:
# https://github.com/xdebug/xdebug/branches
RUN cd /tmp && \
  git clone https://github.com/xdebug/xdebug.git && \
  cd xdebug && \
  git checkout xdebug_3_2 && \
  phpize && \
  ./configure --enable-xdebug && \
  make && \
  make install && \
  rm -rf /tmp/xdebug

# Copy xdebug.ini to /usr/local/etc/php/conf.d/
COPY xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Since this Dockerfile extends the official Docker image `wordpress`,
# and since `wordpress`, in turn, extends the official Docker image `php`,
# the helper script docker-php-ext-enable (defined for image `php`)
# works here, and we can use it to enable xdebug:
RUN docker-php-ext-enable xdebug