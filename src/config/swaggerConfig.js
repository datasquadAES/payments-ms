const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Payments API',
      version: '1.0.0',
      description: 'API para gestionar pagos de órdenes',
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Servidor local',
      },
    ],
  },
  apis: [
    './src/interfaces/routes/paymentRoutes.js', // Ruta donde están documentadas las rutas de payments
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;