const Sequelize = require('sequelize');
const db = require('../config/db');

var User = db.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(150),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

User.sync();

module.exports = User;
