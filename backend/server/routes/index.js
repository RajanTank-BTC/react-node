const companyController = require('../controllers').Company
const userController = require('../controllers').User
const jwt = require('jsonwebtoken')


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome'
  }));
  app.post('/api/register', userController.register)
  app.post('/api/login', userController.login)
  app.get('/api/info', userController.info)
  app.put('/api/update', userController.update)
  app.get('/api/company', companyController.findCode)
  app.post('/api/company', companyController.create);
  app.get('/api/company/list', companyController.index)
  // app.post('/api/register', userController.register)
  app.get('*', (req, res) => res.status(404).send({
    message: 'Welcome to the beginning of nothingness.',
  }));
}
