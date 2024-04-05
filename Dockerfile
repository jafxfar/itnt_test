# Stage 1: Build the application
FROM node:lts-alpine AS build

# Set working directory
WORKDIR /itnt_front_main

# Copy package.json and package-lock.json (if available)
COPY ./package.json .

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the built application using nginx
FROM nginx:1.19.6-alpine

# Copy built application files from the previous stage
COPY --from=build /itnt_front_main/dist /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Set the command to start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
