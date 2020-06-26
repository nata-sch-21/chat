#!/bin/sh
printenv
echo $DATABASE_URL
goose -dir ../migrations postgres $DATABASE_URL up