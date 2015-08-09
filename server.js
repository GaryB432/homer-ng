var __dirname;
var express = require('express');
var morgan = require('morgan');
var app = express();
app.use('/', express.static(__dirname + '/app'));
app.use('/test', express.static(__dirname + '/test'));
app.use('/bc', express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));
app.listen(3000, function () { return console.log('listening'); });
