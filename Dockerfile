FROM node:12

COPY . /app

WORKDIR /app
RUN chown -R www-data:www-data .

RUN npm install

COPY src /app/web

EXPOSE 4200

CMD ["npm", "start"]