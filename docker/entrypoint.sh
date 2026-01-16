#!/bin/bash

# Run migrations
php artisan migrate --force

# Run seeds (Optional: only if you want it to run every startup)
# Using --force is mandatory in production
php artisan db:seed --force

# Start Apache in the foreground
apache2-foreground
