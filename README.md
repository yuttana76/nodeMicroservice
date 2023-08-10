# Microservices Explained with NodeJS & Docker
Microservice Architecture Example with realtime project

#### To run the project, execute below two commands

- Install `docker` and `docker-compose` according to your operating system

- Clone the repository and navigate to it

- Run `docker-compose build` and `docker-compose up` to start the services

>docker-compose build --no-cache [<service_name>..]

- Try `GET http://localhost/` to check whether application is running


Postman Collection & env - Can find inside the `Postman` folder.
https://github.com/Yasas4D/Microservices-Explained-NodeJS-Docker/blob/main/Postman/Microservices%20Explained.postman_collection.json

KafkaJS
https://www.npmjs.com/package/kafkajs

CloudAMQP
https://api.cloudamqp.com/console/c5bb2caf-7664-4cd4-bfc4-37f19aa32863/details
gamil

mongodb compass
https://www.mongodb.com/try/download/compass

Conduktor
http://localhost:8080/

# KONG
https://www.youtube.com/watch?v=mVxozRoiHPc

Clone project
```
$ git clone https://gitlab.com/supawit/simple-kong.git
$ cd simple-kong
```
Create .env file with content
```
TOKEN_SECRET=<randomstring>
```

Deploy kong, cassandra, konga stack
```
$ docker-compose up -d
```

Prepare database for kong
```
$ docker  run --rm \
--network simple-kong_default \
-e "KONG_DATABASE=postgres" \
-e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
kong:2.4-alpine kong migrations bootstrap
```

Manage kong
```
http://<server-ip>:1337
```