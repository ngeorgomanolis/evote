# eVote app 

The app allow users to register and vote for candidates. 

You can find the rules here https://github.com/ngeorgomanolis/evote/blob/master/evote-requirements.png


## Build with docker-compose
``` bash
#first make sure docker and docker-compose are installed. Run in background (-d)
docker-compose up -d --build
#list running services
docker ps
```


## Build Setup API
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

## Build Setup API
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

> Stack
UI: VueJs
- Tests: vuex-utils 
API: NodeJs/ExpressJs
- Tests: mocha, chai 
Db: PostgreSQL
Deployment: docker, docker-compose
API Documentation: SwaggerUI




