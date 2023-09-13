FROM node:20.6

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY ./src .

ENV HOST=0.0.0.0

ENV PASSWD="root"

EXPOSE 8000

CMD [ "node", "index.js" ]
