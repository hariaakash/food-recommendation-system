## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [API Documents](#api-documents)
  - [Structure](#structure)
    - [Project](#project)
    - [Micro/Service](#microservice)
    - [Micros](#micros)
    - [Dependencies](#dependencies)
  - [Setup](#setup)
    - [For development](#for-development)
    - [For production](#for-production)

### Requirements

  - docker > 17
  - docker-compose > 1.18
  - For development: Hostnames to be set for domain `api.local` pointing to `127.0.0.1` in `/etc/hosts`
  - For production: Necessary domain should be pointed and to be set as labels in `docker-compose.pro.yml`

### API Documents
https://documenter.getpostman.com/view/1088755/RztisV4L

### Structure

#### Project
```
.
+-- config          #Static files go here
+-- data            #Dynamically generated data from micros go here
|   +-- rabbitmq
|   +-- traefik
|   +-- mongodb
+-- services        #All micros go here
|   +-- api
|   +-- orchestrator
|   +-- user
|   +-- restaurant
+-- readme.md
+-- docker-compose.yml
+-- package*.json   #Global packages required for development.
```

#### Micro/Service
```
.
+-- src
|   +-- helpers
|   +-- listeners/controllers
|   +-- schemas     #Optional
+-- index.js
+-- Dockerfile
+-- package*.json
```

#### Micros
```
- api           :   Express
- orchestrator  :   Pipeline processes
- user          :   Manage user
- restaurant    :   Manage restaurant/dish
- rabbitmq      :   AMQP
- mongodb       :   DB
- traefik       :   Reverse Proxy
```

#### Dependencies
```
Main Dependencies:

- express : For the API
- joi : Validate incoming requests
- amqplib : Communication between microservices
- mongoose : MongoDB connection
- bcryptjs : For hashing passwords
- nanoid : Generating unique random ID for RabbitMQ RPC communication
- morgan : Express middleware for logging requests
- body-parser : Parse request body
- request-ip : For retrieving request's IP
- async : Utilities
- cors : To enable CORS.

Dev Dependencies:

- eslint : Code Quality
- prettier : Code Formatter
- nodemon : Hot-Reload code on save
```

### Setup

#### For development

1. Run the below command from the main directory.
```
docker-compose up --build -d
```
2. API can be accessed at `http://api.local/`

#### For production

```
docker-compose -f docker-compose.pro.yml --build -d
```