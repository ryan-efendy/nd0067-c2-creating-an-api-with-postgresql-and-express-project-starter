### how to setup the database
- run `docker-compose up --detach --build` to spin up the postgres db

###  how to connect to the database
- run `docker ps` and grab the `container_id` of the postgres
- attach a shell on that container by running `docker exec -it <container_id> bash`
- connect to postgres by running `psql -h localhost -p 5432 -U postgres` and the password is `postgres`

### what ports the backend and database are running on
- the backend api service is connected to port 3000
- postgres is connected to the default port 5432

### installing packages and running the service
1. run `npm install` to install the dependencies

2. run `npm run migrate:up` to create the database tables

3. run `npm run prod` to transpile and start the api server
