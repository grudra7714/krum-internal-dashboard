FROM node:latest
MAINTAINER  Rudra Gupta <grudra7714@gmail.com>

RUN mkdir /src
COPY src /src/
WORKDIR /src

RUN npm install -g forever bower nodemon && npm install

WORKDIR /src/ui
RUN bower install --allow-root

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
