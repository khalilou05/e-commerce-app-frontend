FROM node

WORKDIR /frontend


RUN npm i
RUN npm run build
COPY . .

CMD [ "npm", "start" ]
