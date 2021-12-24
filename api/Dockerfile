FROM python:3

WORKDIR /usr/src/app

COPY . .
RUN chmod +x entrypoint.sh

RUN apt-get -y update
RUN apt-get -y install nginx
RUN pip3 install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y netcat

COPY nginx.conf /etc/nginx

EXPOSE ${FLASK_CONTAINER_PORT}

ENTRYPOINT ["bash","entrypoint.sh"]
