const express = require('express');
const app = express();
const port = 5000;
const db = require('./config/database/index');
const router = require('./routes/index');
require('dotenv').config();
router.router(app);
db.connect();
const bp = require('body-parser')
app.use(express.json)
app.use(express.urlencoded())


app.listen(port,function(){
    console.log('listening on port '+port);
});