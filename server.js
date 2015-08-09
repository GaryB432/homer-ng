var __dirname;
var express = require('express');
var morgan = require('morgan');
var app = express();
app.use('/', express.static(__dirname + '/app'));
app.use(morgan('dev'));
app.listen(3000, function () { return console.log('listening'); });
