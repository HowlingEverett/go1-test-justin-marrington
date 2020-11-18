FROM node:latest

WORKDIR /home/serve

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3080

ENV NODE_ENV production

CMD [ "node", "server.js" ]
