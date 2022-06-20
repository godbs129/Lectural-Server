FROM node:16

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN npm install --force
RUN ls -al

COPY . .

CMD ["npm", "run", "start"]