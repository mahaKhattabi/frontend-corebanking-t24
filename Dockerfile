FROM node:10-slim as builder
WORKDIR /app
ADD . .
RUN yarn install
RUN yarn build

FROM nginx:1.17
WORKDIR /app
COPY --from=builder /app/build .
ADD server.conf /etc/nginx/conf.d/default.conf