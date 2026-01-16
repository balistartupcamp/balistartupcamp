#!/bin/bash

php artisan storage:link --force

php artisan migrate --force
php artisan optimize

exec apache2-foreground
