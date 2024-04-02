FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.19.6-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]