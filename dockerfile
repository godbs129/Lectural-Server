FROM node:16

VOLUME ["/var/lib/docker/volumes/lectural-public", "/usr/src/lectural/public"]

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN yarn

COPY . .

CMD ["yarn", "start"]