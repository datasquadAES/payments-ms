require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerConfig'); // Asegúrate de tener este archivo configurado
const paymentRoutes = require('./interfaces/routes/paymentRoutes');
const { probarConexion } = require('./infrastructure/database/db'); // Debes tener esta función para probar la conexión

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de logging con morgan
app.use(morgan('dev'));

// Rutas de la API
app.use('/', paymentRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Función para iniciar el servidor
async function iniciarServidor() {
  try {
    // Probar la conexión a la base de datos
    await probarConexion();

    // Iniciar el servidor si la conexión es exitosa
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor debido a un error en la conexión a la base de datos.');
    process.exit(1);
  }
}

// Llamar a la función para iniciar el servidor
iniciarServidor();