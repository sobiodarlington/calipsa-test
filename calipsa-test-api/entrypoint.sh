#!/bin/bash

npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize db:seed:all
node ./bin/www
