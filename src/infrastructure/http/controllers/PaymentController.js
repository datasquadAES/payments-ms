class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async create(req, res) {
    try {
      const payment = await this.paymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const payment = await this.paymentService.getPaymentById(req.params.id);
      if (!payment) return res.status(404).json({ error: 'Pago no encontrado' });
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const filters = { ...req.query };
      const payments = await this.paymentService.getPayments(filters);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const payment = await this.paymentService.updatePayment(req.params.id, req.body);
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.paymentService.deletePayment(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;