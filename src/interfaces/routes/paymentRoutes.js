const express = require('express');
const router = express.Router();
const PaymentController = require('../../infrastructure/http/controllers/PaymentController');
const PaymentService = require('../../application/services/PaymentService');
const SequelizePaymentRepository = require('../../infrastructure/database/sequelize/PaymentRepository');
const { Payment, PaymentLogs } = require('../../domain/entities/associations');
const {
  createPaymentValidator,
  updatePaymentValidator,
  getPaymentByIdValidator,
  deletePaymentValidator,
  getPaymentsValidator
} = require('../../infrastructure/http/middlewares/PaymentValidators');
const validate = require('../../infrastructure/http/middlewares/validate');

// Dependencias
const paymentRepository = new SequelizePaymentRepository(Payment, PaymentLogs);
const paymentService = new PaymentService(paymentRepository);
const paymentController = new PaymentController(paymentService);

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gestión de pagos de órdenes
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Crear un pago
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 enum: [pendiente, exitoso, fallido, cancelado]
 *               payment_method:
 *                 type: string
 *               transaction_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pago creado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/payments', createPaymentValidator, validate, paymentController.create.bind(paymentController));

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Obtener todos los pagos (con filtros)
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: payment_method
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de pagos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/payments', getPaymentsValidator, validate, paymentController.getAll.bind(paymentController));

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Obtener un pago por ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pago encontrado
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/payments/:id', getPaymentByIdValidator, validate, paymentController.getById.bind(paymentController));

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Actualizar un pago
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 enum: [pendiente, exitoso, fallido, cancelado]
 *               payment_method:
 *                 type: string
 *               transaction_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pago actualizado exitosamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/payments/:id', updatePaymentValidator, validate, paymentController.update.bind(paymentController));

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Eliminar un pago
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pago eliminado exitosamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/payments/:id', deletePaymentValidator, validate, paymentController.delete.bind(paymentController));

module.exports = router;