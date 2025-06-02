const { Op } = require('sequelize');

class SequelizePaymentRepository {
  constructor(PaymentModel, PaymentLogsModel) {
    this.Payment = PaymentModel;
    this.PaymentLogs = PaymentLogsModel;
  }

  async create(paymentData) {
    return await this.Payment.create(paymentData);
  }

  async findById(paymentId) {
    return await this.Payment.findByPk(paymentId, { include: [{ model: this.PaymentLogs, as: 'logs' }] });
  }

  async findAll(filters = {}) {
    const where = {};
    if (filters.order_id) where.order_id = filters.order_id;
    if (filters.user_id) where.user_id = filters.user_id;
    if (filters.status) where.status = filters.status;
    if (filters.payment_method) where.payment_method = filters.payment_method;
    if (filters.amount) where.amount = filters.amount;
    // Puedes agregar más filtros según tus atributos

    return await this.Payment.findAll({
      where,
      include: [{ model: this.PaymentLogs, as: 'logs' }]
    });
  }

  async update(paymentId, updateData) {
    const payment = await this.Payment.findByPk(paymentId);
    if (!payment) throw new Error('Pago no encontrado');
    await payment.update(updateData);
    return payment;
  }

  async delete(paymentId) {
    const payment = await this.Payment.findByPk(paymentId);
    if (!payment) throw new Error('Pago no encontrado');
    await payment.destroy();
    return { message: 'Pago eliminado' };
  }
}

module.exports = SequelizePaymentRepository;