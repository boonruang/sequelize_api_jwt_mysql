const Sequelize = require('sequelize');
const db = require('../config/db');

var Contact = db.define(
  'contacts',
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
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      }
    }
  },
  {
    timestamps: false
  }
);

Contact.sync();

module.exports = Contact;
