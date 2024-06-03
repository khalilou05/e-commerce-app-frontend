FROM node
WORKDIR /app
COPY . /app

RUN npm build

CMD [ "npm", "start" ]
