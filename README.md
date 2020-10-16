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

### Auth flow

1. check if in session storage accessToken exists
2. if exists verify by https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=
3. if ok get googleId from session storage and request acc from backend by googleId
4. if token doesn't exist or error display Login button
5. after login take accessToken and googleId, check if googleId exists in DB
6. if not, create user in DB
7. if exists return user
8. save googleId and accessToken in session storage

const tokenRes: Response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`); //verify tocken
const d = await tokenRes.json(); // return d.error if not valid