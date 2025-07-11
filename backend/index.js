const app = require('express')()
const consign = require('consign');

consign()
    .then('./config/middlewares.js')
    .then('./api') //every folder from api is loaded by consign
    .then('./config/routes.js')
    .into(app)

//port 3000
app.listen(3000, () =>{
    console.log('Backend1...');
})