# build environment
FROM node:17.3.0-alpine as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE ${WEB_CONTAINER_PORT}
CMD ["nginx", "-g", "daemon off;"]
