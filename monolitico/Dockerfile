FROM node:latest
WORKDIR /var/www
COPY . /var/www
RUN npm install
EXPOSE 9000
ENTRYPOINT [ "npm", "start" ]