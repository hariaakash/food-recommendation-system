## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Structure](#structure)
    - [Project Structure](#project-structure)
    - [Micros Structure](#micros-structure)
    - [Micros](#micros)
  - [Setup](#setup)


### Requirements

  - docker > 17
  - docker-compose > 1.18

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
+-- readme.md
+-- docker-compose.yml
+-- package*.json   #Global packages required for development.
```

#### Micros Structure
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
- rabbitmq      :   AMQP
- mongodb       :   DB
- traefik       :   Reverse Proxy
```

### Setup

```
docker-compose up --build -d
```