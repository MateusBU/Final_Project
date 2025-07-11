const app = require('express')()
const consign = require('consign');

consign()
    .then('./config/middlewares.js')
    .into(app)

//port 3000
app.listen(3000, () =>{
    console.log('Backend1...');
})