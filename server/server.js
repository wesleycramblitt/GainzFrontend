
const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const path = require("path");

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, '../client', 'index.html'));
})


app.listen(port, () => console.log(`Gainz listening on port ${port}!`))




