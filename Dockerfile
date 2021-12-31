FROM node
COPY . /var/www
WORKDIR /var/www
RUN npm install --only=production
EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]