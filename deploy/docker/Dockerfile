FROM node:20 AS base 

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

FROM base AS build

WORKDIR /usr/src/app

COPY . . 
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm build
RUN npm prune --prod

FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app

EXPOSE 3333

CMD [ "npm", "start" ]