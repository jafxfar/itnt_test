FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn
COPY . .
RUN yarn build


CMD [ "nginx", "-g", "daemon off;" ]