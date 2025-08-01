const app = require('express')()
const consign = require('consign');
const db = require('./config/db')
const mongoose = require('mongoose')
require('./config/mongodb')

app.db = db; //this sb is knex (knex.js). Now it is possible to use get, post, delete,...
app.mongoose = mongoose;

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api') //every folder from api is loaded by consign
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

//port 3000
app.listen(3000, () =>{
    console.log('Backend1...');
})