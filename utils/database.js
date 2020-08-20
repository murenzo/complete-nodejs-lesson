const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodecomplete', 'root', 'Faiztech.01',{dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;