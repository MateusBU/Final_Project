const mongoose = require("mongoose");

const uri = "mongodb://localhost/knowledge_stats";

mongoose.connect(uri)
  .then(() => {
    console.log('\x1b[42m%s\x1b[30m', 'MongoDB Connected Successfully!', '\x1b[0m');
  })
  .catch(e => {
    const msg = 'ERROR!!! Not possible to connect to MongoDB!';
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m');
    console.error(e);
  });