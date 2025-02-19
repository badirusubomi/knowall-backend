FROM node:18-alpine

WORKDIR /app

COPY package*.json .

COPY yarn.lock .

RUN yarn install

RUN yarn build

COPY . /app/

EXPOSE 8080

CMD ["yarn", "start:prod"]