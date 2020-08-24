const {DataTypes} = require("sequelize");

const sequelize = require("../utils/database");

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    }
});

module.exports = Order;