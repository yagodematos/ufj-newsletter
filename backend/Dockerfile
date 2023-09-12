FROM node:20.6

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm ci --omit=dev

COPY ./src .

EXPOSE 3000

CMD [ "node", "index.js" ]
