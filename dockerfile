FROM node:16

VOLUME ["/usr/src/lectural/public"]

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN yarn

COPY . .

CMD ["yarn", "start"]