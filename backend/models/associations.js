
import User from './User.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

// User - Order association
User.hasMany(Order);
Order.belongsTo(User);

// Order - OrderItem association
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product - OrderItem association
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
