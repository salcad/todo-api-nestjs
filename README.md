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

