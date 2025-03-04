-- Insertar categorías de ejemplo
INSERT INTO categories (name, description) VALUES
('Materiales', 'Gastos relacionados con materiales de construcción y suministros'),
('Comida', 'Gastos de alimentación durante jornadas laborales'),
('Alojamiento', 'Gastos de hospedaje en viajes de trabajo'),
('Transporte', 'Gastos de desplazamiento, combustible, peajes, etc.'),
('Herramientas', 'Compra o alquiler de herramientas'),
('Servicios', 'Contratación de servicios externos'),
('Otros', 'Gastos varios no categorizados');

-- Insertar proyectos de ejemplo
INSERT INTO projects (name) VALUES
('Proyecto Residencial Los Pinos'),
('Remodelación Oficinas Centrales'),
('Construcción Centro Comercial'),
('Mantenimiento Edificio Corporativo'),
('Instalación Eléctrica Industrial');

-- Insertar recibos de ejemplo (asumiendo que ya existen usuarios)
-- Nota: Reemplazar 'USER_ID_1' y 'USER_ID_2' con IDs reales de usuarios
INSERT INTO receipts (amount, date, description, merchant, status, category_id, project_id, user_id, image_path) VALUES
(15000, NOW() - INTERVAL '5 days', 'Compra de cemento', 'Ferretería El Constructor', 'pending', 1, 1, 'USER_ID_1', 'receipts/receipt1.jpg'),
(5000, NOW() - INTERVAL '4 days', 'Almuerzo equipo', 'Restaurante La Esquina', 'pending', 2, 1, 'USER_ID_1', 'receipts/receipt2.jpg'),
(35000, NOW() - INTERVAL '3 days', 'Hotel durante visita a obra', 'Hotel Central', 'pending', 3, 2, 'USER_ID_2', 'receipts/receipt3.jpg'),
(8000, NOW() - INTERVAL '2 days', 'Gasolina', 'Estación de Servicio XYZ', 'pending', 4, 2, 'USER_ID_2', 'receipts/receipt4.jpg'),
(12000, NOW() - INTERVAL '1 day', 'Alquiler taladro industrial', 'Alquiler Maquinaria Pesada', 'pending', 5, 3, 'USER_ID_1', 'receipts/receipt5.jpg');

-- Insertar comentarios de ejemplo
INSERT INTO comments (receipt_id, user_id, content) VALUES
(1, 'USER_ID_1', 'Factura original entregada a contabilidad'),
(2, 'USER_ID_2', 'Por favor especificar los asistentes al almuerzo'),
(3, 'USER_ID_1', 'Verificar si incluye desayuno'),
(4, 'USER_ID_2', 'Adjuntar kilometraje del vehículo'),
(5, 'USER_ID_1', 'Confirmar duración del alquiler');

-- Insertar notificaciones de ejemplo
INSERT INTO notifications (user_id, title, body, data) VALUES
('USER_ID_1', 'Recibo aprobado', 'Tu recibo de Ferretería El Constructor ha sido aprobado', '{"receipt_id": 1}'),
('USER_ID_1', 'Recibo rechazado', 'Tu recibo de Restaurante La Esquina ha sido rechazado. Motivo: Falta información', '{"receipt_id": 2}'),
('USER_ID_2', 'Recibo pendiente', 'Tu recibo de Hotel Central está pendiente de revisión', '{"receipt_id": 3}'),
('USER_ID_2', 'Comentario nuevo', 'Hay un nuevo comentario en tu recibo de Estación de Servicio XYZ', '{"receipt_id": 4, "comment_id": 4}'),
('USER_ID_1', 'Recordatorio', 'Tienes recibos pendientes de subir para el Proyecto Residencial Los Pinos', '{"project_id": 1}'); 