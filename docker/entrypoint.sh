#!/bin/bash

php artisan storage:link --force

php artisan migrate --force
php artisan optimize

# Start supervisor (runs Apache + Queue Worker)
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
