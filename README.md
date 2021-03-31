# eVote app 

The app allow users to register and vote for candidates. 

You can find the rules here: https://github.com/ngeorgomanolis/evote/blob/master/evote-requirements.png

## Build with docker-compose in production (recommended)

1. Follow the instructions below for production build.

Instructions MAC. For Linux find you host IP directly. 
``` bash
#Create machine evote
docker-machine create --driver virtualbox evote

#Connect your shell to the new machine.
eval "$(docker-machine env evote)"

#list machines
docker-machine ls

#get the url of your machine (we need the ip). for example
tcp://192.168.99.105:2376 

#start/stop machine if necessary
docker-machine start (or stop) evote
``` 

2. Replace BASE_ENDPOINT url: 
- https://github.com/ngeorgomanolis/evote/blob/master/evote-ui/config/prod.env.js
3. Replace API_SWAGGER_URL url:
- https://github.com/ngeorgomanolis/evote/blob/master/docker-compose.yml


4. Navigate to the project folder and run:
``` bash
#make sure docker and docker-compose are installed. Build images (--build) and run in background (-d) and wait...
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

# serve with hot reload http://localhost:3001
npm run start

# build for production with minification. 
npm run prod:serve

# build for production and view the bundle analyzer report
npm run test
```

## Build Setup UI
``` bash
# install dependencies
yarn install

# serve with hot reload 
yarn run dev

# build for production with minification. Set the base_endpoint url here: https://github.com/ngeorgomanolis/evote/blob/master/evote-ui/config/prod.env.js
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run all tests
yarn test
```

## Stack Overview

UI: VueJs
- Tests: vuex-utils 
API: NodeJs/ExpressJs
- Tests: mocha, chai 
Db: PostgreSQL
Deployment: docker, docker-compose
API Documentation: SwaggerUI

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
- Replace webpack to avoid certain issues with env variables.
