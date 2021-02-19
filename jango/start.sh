cd ../temp/
npm run build

cd ../jango/

python manage.py collectstatic --noinput
python manage.py runserver