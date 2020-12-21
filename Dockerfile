FROM node:15.0.1 AS intermediate

WORKDIR /app

COPY ./package.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:15.0.1-alpine

WORKDIR /app

COPY --from=intermediate /app ./

EXPOSE 3000

CMD ["yarn", "start:prod"]