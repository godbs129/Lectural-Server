FROM node:16

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN npm install --force

COPY . .

CMD ["npm", "run", "start"]
RUN ls -al