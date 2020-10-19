## Chat

 - server - Go
 - client - create-react-app + typescript
 - docker
 
docker build -t golang-heroku .
docker run -p 3000:8080 -d golang-heroku

#### Database

docker run -p 5432:5432 --name go-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker start go-postgres

- Log into the container using the postgres user and start psql

docker exec -it -u postgres go-postgres psql
create database gotutorial;

- create migration
goose -dir migrations create initial_seed sql
- run migration
goose -dir migrations postgres "postgres://postgres:mysecretpassword@localhost:5432/chat?sslmode=disable" up

### Dev

from server dir DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/chat?sslmode=disable go run main.go

docker run -p 5432:5432 --name go-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
docker start go-postgres
