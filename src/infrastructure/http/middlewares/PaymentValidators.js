const { body, param, query } = require('express-validator');

const createPaymentValidator = [
  body('order_id').isInt().withMessage('order_id debe ser un número entero'),
  body('user_id').isInt().withMessage('user_id debe ser un número entero'),
  body('amount').isDecimal().withMessage('amount debe ser decimal'),
  body('status').optional().isString().isIn(['pendiente', 'exitoso', 'fallido', 'cancelado']),
  body('payment_method').optional().isString(),
  body('transaction_id').optional().isString()
];

const updatePaymentValidator = [
  param('id').isInt().withMessage('El id debe ser un número entero'),
  body('order_id').optional().isInt(),
  body('user_id').optional().isInt(),
  body('amount').optional().isDecimal(),
  body('status').optional().isString().isIn(['pendiente', 'exitoso', 'fallido', 'cancelado']),
  body('payment_method').optional().isString(),
  body('transaction_id').optional().isString()
];

const getPaymentByIdValidator = [
  param('id').isInt().withMessage('El id debe ser un número entero')
];

const deletePaymentValidator = [
  param('id').isInt().withMessage('El id debe ser un número entero')
];

const getPaymentsValidator = [
  query('order_id').optional().isInt().withMessage('order_id debe ser un número entero'),
  query('user_id').optional().isInt().withMessage('user_id debe ser un número entero'),
  query('status').optional().isString(),
  query('payment_method').optional().isString(),
  query('amount').optional().isDecimal().withMessage('amount debe ser decimal')
];

module.exports = {
  createPaymentValidator,
  updatePaymentValidator,
  getPaymentByIdValidator,
  deletePaymentValidator,
  getPaymentsValidator
};