## Available Scripts

 - server - Go
 - client - create-react-app + typescript
 - docker
 
docker build -t golang-heroku .
docker run -p 3000:8080 -d golang-heroku

heroku login
git push heroku master

#### Database

docker run -p 5432:5432 --name go-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

- Log into the container using the postgres user and start psql

docker exec -it -u postgres go-postgres psql

### Dev

DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5432/chat?sslmode=disable go run main.go