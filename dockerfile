FROM node:16

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN yarn

COPY . .

CMD ["yarn", "start:dev"]