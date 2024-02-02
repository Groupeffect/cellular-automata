FROM docker.io/node:20

RUN apt-get -y update && apt-get -y upgrade


WORKDIR /app
COPY ./frontend/. /app/.

CMD [ "yarn", "build" ]