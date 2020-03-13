const Companydb = require('../../models')
const Company = require('../../models').Company;
const User = require('../../models').User

const Op = Companydb.Sequelize.Op;

module.exports = {
  create(req, res) {
    console.log(req.body)
    return User
      .create({
        name: req.body.name,
        code: req.body.code
      })
      .then(company => res.status(201).send(company))
      .catch(error => res.status(400).send(error))
  },
  findCode(req, res) {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    return Company.findAll({
      where: condition
    })
      .then(company => res.status(200).send(company))
      .catch(error => res.status(400).send(error))
  },
  index(req, res) {
    return Company
      .findAll()
      .then(company => res.status(200).send(company))
      .catch(error => res.status(400).send(error))
  }
}