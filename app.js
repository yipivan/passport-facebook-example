// Importing libraries
const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

// User-defined Modules.
const app = express();
const server = require('http').Server(app);
const setupPassport = require('./passport');
const session = require('./session')
const io = require('./socket')(server);
const router = require('./router')(express);


app.use(expressSession(session.settings));

app.use(bodyParser());

setupPassport(app);

app.use('/', router);

server.listen(port);
console.log('listening on port ', port);