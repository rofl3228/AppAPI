const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cfg = require('./config/config');
const db = cfg.db;
const app = express();
const port = cfg.port;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url, (err, database) =>{
   if(err) return console.log(err);
   require('./app/routes')(app, database.db('appdb'));

   app.listen(port, () => {
      console.log('Server start on localhost:'+port);
   });
});