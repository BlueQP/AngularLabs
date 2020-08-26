const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../dist/week5/')));
let server = http.listen(3000, 
    function () { 
        let host = server.address().address; 
        let port = server.address().port; 
        console.log("My First Nodejs Server!"); 
        console.log("Server listening on: "+ host + " port: " + port);
    });
app.post('/api/auth', require('./routes/postLogin'));