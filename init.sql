-- Tabla de pagos
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL, -- Relación lógica con la orden
    user_id INT NOT NULL,  -- Usuario que realiza el pago
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pendiente', -- pendiente, exitoso, fallido, cancelado
    payment_method VARCHAR(50), -- tarjeta, efectivo, etc.
    transaction_id VARCHAR(100), -- ID de la pasarela de pago (opcional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de logs de pagos (opcional, para trazabilidad)
CREATE TABLE IF NOT EXISTS payment_logs (
    id SERIAL PRIMARY KEY,
    payment_id INT NOT NULL,
    status VARCHAR(30) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);

-- Ejemplo de datos de prueba
INSERT INTO payments (order_id, user_id, amount, status, payment_method, transaction_id)
VALUES
(1, 1, 50000, 'exitoso', 'tarjeta', 'TXN123456'),
(2, 2, 32000, 'pendiente', 'efectivo', NULL),
(3, 3, 18000, 'fallido', 'tarjeta', 'TXN654321');