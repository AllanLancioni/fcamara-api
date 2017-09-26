const isDevMode = false;

const
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    db  = require('./database/db-config'),
    jwt = require('jsonwebtoken');

const 
    app = express(),
    secret = 'fcamara';

let payload = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = {
    express,
    app,
    bodyParser,
    isDevMode,
    mongoose: db.mongoose,
    dbConfig: db.dbConfig,
    db: db.conn,
    jwt,
    secret
};
