const logger = require('../../utils/Logger');

class PaymentService {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async createPayment(data) {
    try {
      logger.info(`Creando pago: ${JSON.stringify(data)}`);
      const result = await this.paymentRepository.create(data);
      logger.info(`Pago creado con ID: ${result.id}`);
      return result;
    } catch (error) {
      logger.error(`Error al crear pago: ${error.message}`);
      throw error;
    }
  }

  async getPaymentById(id) {
    try {
      logger.info(`Buscando pago por ID: ${id}`);
      const payment = await this.paymentRepository.findById(id);
      if (!payment) {
        logger.warn(`Pago no encontrado con ID: ${id}`);
      }
      return payment;
    } catch (error) {
      logger.error(`Error al buscar pago por ID: ${error.message}`);
      throw error;
    }
  }

  async getPayments(filters) {
    try {
      logger.info(`Obteniendo pagos con filtros: ${JSON.stringify(filters)}`);
      const payments = await this.paymentRepository.findAll(filters);
      logger.info(`Pagos encontrados: ${payments.length}`);
      return payments;
    } catch (error) {
      logger.error(`Error al obtener pagos: ${error.message}`);
      throw error;
    }
  }

  async updatePayment(id, data) {
    try {
      logger.info(`Actualizando pago ID: ${id} con datos: ${JSON.stringify(data)}`);
      const result = await this.paymentRepository.update(id, data);
      logger.info(`Pago actualizado ID: ${id}`);
      return result;
    } catch (error) {
      logger.error(`Error al actualizar pago ID ${id}: ${error.message}`);
      throw error;
    }
  }

  async deletePayment(id) {
    try {
      logger.info(`Eliminando pago ID: ${id}`);
      const result = await this.paymentRepository.delete(id);
      logger.info(`Pago eliminado ID: ${id}`);
      return result;
    } catch (error) {
      logger.error(`Error al eliminar pago ID ${id}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = PaymentService;