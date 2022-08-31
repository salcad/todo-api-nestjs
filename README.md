![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Sqlite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![MySql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)


# Todo API with NestJS, JWT Auth & Sequelize ORM

## Running the Todo NestJS API app

- Run `yarn install`
- Rename `.env.sample` to `.env` 
- In Development environment default database using Sqlite
- In Production environment it is possible to use Posgresql or Mysql database
- Run `yarn start`
- To show Swagger API just type http://localhost:3000/swagger in browser
- To run Ionic Todo App go to http://localhost:3000 

## Deploying Ionic Todo App as static page on Todo NestJS API

- Build [Todo Ionic App](https://github.com/salcad/todo-app-ionic) project using `yarn run build`
- Copy Ionic output on `build` folder to the Todo API NestJS project on `client` folder
- To run it just type http://localhost:3000 in browser

## Technologies

- NestJS
- Sequelize ORM
- Typescript

