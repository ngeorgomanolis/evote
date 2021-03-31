# eVote app 

The app allow users to register and vote for candidates. 

You can find the rules here: https://github.com/ngeorgomanolis/evote/blob/master/evote-requirements.png

## Build with docker-compose (recommended)

Instructions for Mac
``` bash
#Create machine evote
docker-machine create --driver virtualbox evote
#Connect your shell to the new machine.
eval "$(docker-machine env evote)"
#start/stop machine
docker-machine start (or stop) evote
#list machines
docker-machine ls 
#get the url of your machine (we need the ip). for example
tcp://192.168.99.108:2376 
#For Linux machines: localhost
``` 
Then run: 
``` bash
#make sure docker and docker-compose are installed. Build images (--build) and run in background (-d) 
docker-compose up -d --build
#list running services
docker ps
```

## Build Setup API 

Depends on DB. Make sure you have installed a version of PostgreSQL. Then create user, password and database. 
db service example: https://github.com/ngeorgomanolis/evote/blob/master/docker-compose.yml

``` bash
# install dependencies
npm install

# serve with hot reload 
npm run start

# build for production with minification
npm run prod

# build for production and view the bundle analyzer report
npm run test
```

## Build Setup UI
``` bash
# install dependencies
yarn install

# serve with hot reload 
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run all tests
yarn test
```

## Stack Overview

- UI: VueJs
- API: NodeJs/ExpressJs  
- Db: PostgreSQL
- Tests: vuex-utils, mocha, chai
- Deployment: docker, docker-compose
- API Documentation: SwaggerUI


## Microservices pattern
Services:
- api
- ui
- db
- swagger-ui


## Improvements
- remove swagger-autogen
- openapi and speccy to resolve endpoints .yaml and expose swagger.yaml 
- env variables and git secret to hide sensitive info

