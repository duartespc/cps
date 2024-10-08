FROM node:20

WORKDIR /app1

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3050

EXPOSE 3050

CMD [ "npm", "start" ]