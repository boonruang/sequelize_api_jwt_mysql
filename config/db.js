const Sequelize = require('sequelize');

const sequelize = new Sequelize('orm_jwt', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
