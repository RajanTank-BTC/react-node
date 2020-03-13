const Userdb = require('../../models')
const User = require('../../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register(req, res) {
    let userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        console.log(!user)
        if (!user) {
          User
            .create(userData)
            .then(user => {
              res.status(200).send({ message: user.email + ' Registered' })
            })
            .catch(error => {
              console.log(error, "error")
              res.status(400).send('error' + error)
            })
        }
        else {
          res.status(400).send({ error: 'User already exists' })
        }
      })
      .catch(error => {
        res.status(400).send({ error })
      })
  },
  login(req, res) {
    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, "12345678910", {
              expiresIn: 14000
            })
            res.status(200).send({ "token": token })
          }
        }
        else {
          res.status(400).send({ error: 'user does not exist' })
        }
      })
      .catch(error => {
        res.status(400).send({ error: error })
      })
  },
  info(req, res) {
    console.log(req)
    jwt.verify(req.headers.authorization, "12345678910", function (err, decoded) {
      if (decoded) {
        console.log(decoded)
        return User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (user) {
            res.status(200).send({ "user": user })
          }
          else {
            res.status(400).send({ error: 'user does not exist' })
          }
        })
          .catch(error => {
            res.status(400).send({ error: error })
          })
      }
    })
  },
  update(req, res) {
    console.log(req)
    jwt.verify(req.headers.authorization, "12345678910", function (err, decoded) {
      if (decoded) {
        let data = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email
        }
        console.log(decoded)
        return User.update(data, {
          where: {
            email: decoded.email
          }
        }).then(user => {
          if (user) {
            res.status(200).send({ message: 'user updated' })
          }
          else {
            res.status(400).send({ error: 'user does not exist' })
          }
        })
          .catch(error => {
            res.status(400).send({ error: error })
          })
      }
    })
  }
}