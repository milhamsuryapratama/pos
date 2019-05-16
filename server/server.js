const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const router = require('../server/router');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'point_of_sale'
});

con.connect((err) => {
    err ? console.log('connection error') : console.log('connection success');
})

app.use(cors());
app.use((req, res, next) => {
    req.con = con;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
app.use(express.static('public'));

app.listen(3001, () => {
    console.log('server runnig success');
})