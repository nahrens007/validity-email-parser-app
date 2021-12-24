#!/bin/sh
echo "Waiting for postgres..."

while ! nc -z $DATABASE_CONTAINER_NAME $DATABASE_CONTAINER_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

if [ "$FLASK_ENV" = "development" ]
then
    echo "Creating the database tables..."
    python manage.py create_db
    echo "Tables created"
    python manage.py run
else
    echo "Non-dev environment, prepping database..."
    python manage.py prep_db
    echo "Database prep complete"
    service nginx start
    uwsgi --ini uwsgi.ini
fi
