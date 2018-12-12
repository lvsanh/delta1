# ChatApp Server

This is a server for ChatApp

It has these endpoints:

* `POST /users`: sign up as new user
* `POST /logins`: log in and receive a JWT
* `GET /projects`: list all projects
* `GET /projects/:id`: list a project
* `POST /projects`: create a new project
* `POST /projects/:id/messages`: create a new message
* `GET /users`: list all users

## Running

* You need a working Postgres database that is preferrably empty (drop all the tables) and running 
* Install the dependencies using `yarn install`
* Compile the app (Typescript > Javascript) using `yarn compile` (during development you can use `yarn watch`)
* `yarn start`