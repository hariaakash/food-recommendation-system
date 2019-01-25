## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [API Documents](#api-documents)
  - [Structure](#structure)
    - [Project Structure](#project-structure)
    - [Micro/Service Structure](#microservice-structure)
    - [Micros](#micros)
  - [Setup](#setup)

### Requirements

  - docker > 17
  - docker-compose > 1.18
  - Hostnames to be set for domain `api.local` pointing to `127.0.0.1` in `/etc/hosts`

### API Documents
https://documenter.getpostman.com/view/1088755/RztisV4L

### Structure

#### Project Structure
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

#### Micro/Service Structure
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

### Setup
1. Run the below command from the main directory.
```
docker-compose up --build -d
```
2. API can be accessed at `http://api.local/`