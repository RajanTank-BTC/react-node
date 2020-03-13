'use strict';
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'User',
    hooks: {
      beforeCreate(instance, option) {
        if (instance.password) {
          instance.password = bcrypt.hashSync(instance.password, 10)
        }
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};