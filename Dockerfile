FROM node:fermium-alpine3.10

WORKDIR /app

COPY ./server/ /app

RUN npm install

COPY ./dist /app/dist

CMD npm start

