FROM node:6.12.3 as build

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --production --silent

COPY . .
RUN yarn build

FROM nginx:1.17.8-alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/dashboard.conf

RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/public /usr/share/nginx/html
