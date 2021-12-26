FROM python:3

WORKDIR /usr/src/app

COPY project/ ./project/
COPY conf/uwsgi_params conf/uwsgi_params
COPY conf/uwsgi.ini conf/uwsgi.ini
COPY entrypoint.sh .
COPY manage.py .
COPY requirements.txt .

RUN chmod +x entrypoint.sh

RUN apt-get -y update
RUN apt-get -y install nginx
RUN pip3 install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y netcat
RUN apt-get install -y dos2unix

COPY conf/nginx.conf /etc/nginx

RUN dos2unix entrypoint.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

EXPOSE ${FLASK_CONTAINER_PORT}

ENTRYPOINT ["bash","entrypoint.sh"]
