const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var cors = require('cors')


const app=express().use('*', cors());

app.use(cors()) 
app.use(express.static(path.join(__dirname, 'build')));
app.post('/api', function(req, res){ 
  request('http://localhost:8080/oauth/token', function (error, response, body) { 
    if (!error && response.statusCode === 200) { 
      console.log(body); 
      res.send(body); 
    } 
   }); 
});



app.listen(process.env.PORT || 8081);