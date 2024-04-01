FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn
COPY . .
RUN yarn build

FROM nginx:stable-alpine as  production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./.nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]