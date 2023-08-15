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

## Kafka
:Conduktor
http://localhost:8080/

docker compose file

```
CDK_ADMIN_EMAIL: "admin@admin.io"
CDK_ADMIN_PASSWORD: "admin"
```
### tutorial
https://www.youtube.com/watch?v=6-1N8wIZ1ic&t=257s
https://www.youtube.com/watch?v=gTwXG8lC2GM

## KONG
https://www.youtube.com/watch?v=mVxozRoiHPc

###
How to Add a Service, Route and and Plugins Kong API Gateway
https://www.youtube.com/watch?v=8tniLQgV5xI

https://docs.konghq.com/gateway/latest/get-started/services-and-routes/

### tutorial
https://wisdomgoody.medium.com/%E0%B8%A1%E0%B8%B2%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99-kong-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-konga-%E0%B8%81%E0%B8%B1%E0%B8%99-%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%88%E0%B8%B0%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%A7%E0%B9%88%E0%B8%B2-kong-%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%94%E0%B8%B5%E0%B9%81%E0%B8%84%E0%B9%88%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99-api-gateway-%E0%B8%97%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B9%86%E0%B9%84%E0%B8%9B-%E0%B8%95%E0%B8%AD%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88-1-17185899e1d0


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
admin
Abc@123
```

127.16.20.140