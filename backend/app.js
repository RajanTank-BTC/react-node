const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const passport = require('passport');

const initializePassport = require('./passport-config')

initializePassport(passport, email => {
  return user.find(user => user.emai === email)
})

const user = []

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let models = require('./models')
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
models.sequelize.sync().then(function () {
  console.log("nice ")
}).catch(function (error) {
  console.log(error, "error")
})

require('./server/routes')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;

