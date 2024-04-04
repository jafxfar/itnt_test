# Stage 1: Build the application
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

# Stage 2: Serve the built application using nginx
FROM nginx:1.19.6-alpine

COPY --from=build /itnt_front_main/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
