const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/db').sequelize;

const PaymentLogs = sequelize.define('PaymentLogs', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  payment_id: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING(30), allowNull: false },
  message: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'payment_logs',
  timestamps: false
});

module.exports = PaymentLogs;