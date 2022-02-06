'use strict';

var express = require('express');
var app = express();
module.exports = app; // esto es solo para testear mas facil

// Middleware body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// body parser como middleware
app.use(bodyParser.json());

// importo mis rutas
const routes = require('./routes');
// hago que todas mis rutas empiecen con /users
app.use('/users', routes);

// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
// If the parent object of running module is not listening to any port, then this task is done by its child object explicitly.
// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) app.listen(3000);