FROM alpine:latest

RUN apk add nodejs npm git

RUN echo "Africa/Lagos" > /etc/timezone

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

ENTRYPOINT ["/bin/ash", "./entrypoint.sh"]
CMD ["node", "./bin/www"]

EXPOSE 3000 9090
