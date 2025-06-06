
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

export default OrderItem;
