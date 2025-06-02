const Payment = require('./payment');
const PaymentLogs = require('./payment_logs');

// Un Payment tiene muchos PaymentLogs
Payment.hasMany(PaymentLogs, {
  foreignKey: 'payment_id',
  as: 'logs'
});

// Un PaymentLog pertenece a un Payment
PaymentLogs.belongsTo(Payment, {
  foreignKey: 'payment_id',
  as: 'payment'
});

module.exports = {
  Payment,
  PaymentLogs
};