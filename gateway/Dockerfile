FROM node:20.6

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --omit=dev

RUN mkdir /usr/app/src
RUN mkdir /usr/app/public

COPY ./public ./public

COPY ./src ./src

ENV HOST=0.0.0.0

ENV PASSWD="root"

EXPOSE 8000

CMD [ "npm", "run", "start" ]
