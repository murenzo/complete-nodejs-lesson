const {DataTypes} = require("sequelize");

const sequelize = require("../utils/database");

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    quantity: DataTypes.INTEGER
});

module.exports = OrderItem;