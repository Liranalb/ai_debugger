FROM node:16-alpine as builder

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY ./src ./src
COPY ./public ./public
RUN npm run build

FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
