FROM node:12.14-alpine 

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN chown -R node

USER node

RUN npm install
COPY . .
