FROM node:14

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run", "start"]