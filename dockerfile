FROM node:16

VOLUME ["/usr/src/lectural/public"]

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN npm i

COPY . .

CMD ["npm", "run", "start"]