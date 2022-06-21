FROM node:16

WORKDIR /usr/src/lectural

COPY package.json package.json

RUN yarn
RUN export NODE_OPTIONS=--max_old_space_size=4096

COPY . .

CMD ["yarn", "start"]
