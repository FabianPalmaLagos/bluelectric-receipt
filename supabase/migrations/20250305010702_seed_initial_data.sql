-- Este script debe ejecutarse después de que todas las tablas estén creadas

-- Insertar categorías
INSERT INTO public.categories (name, description)
VALUES
    ('Materiales', 'Gastos relacionados con materiales de construcción y suministros'),
    ('Comida', 'Gastos de alimentación durante jornadas laborales'),
    ('Alojamiento', 'Gastos de hospedaje en viajes de trabajo'),
    ('Transporte', 'Gastos de desplazamiento, combustible, peajes, etc.'),
    ('Herramientas', 'Compra o alquiler de herramientas'),
    ('Servicios', 'Contratación de servicios externos'),
    ('Otros', 'Gastos varios no categorizados')
ON CONFLICT (id) DO NOTHING;

-- Insertar proyectos
INSERT INTO public.projects (id, name, description, is_active)
VALUES
    ('0649781c-5b6f-497a-9f86-d74d97eaa141', 'Proyecto Residencial Los Pinos', NULL, true),
    ('699a7d3e-a9a2-424e-ad53-1c499516d5fd', 'Remodelación Oficinas Centrales', NULL, true),
    ('ddbc164e-2106-4d9e-afa2-ca6a956400b0', 'Construcción Centro Comercial', NULL, true),
    ('9bc51a60-40e7-4d9e-a200-96513207f2dd', 'Mantenimiento Edificio Corporativo', NULL, true),
    ('00cdda41-d342-4cc1-908b-40e12ab1236e', 'Instalación Eléctrica Industrial', NULL, true)
ON CONFLICT (id) DO NOTHING;

-- Insertar usuarios de ejemplo (solo si no existen)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
        -- Crear usuario administrador
        INSERT INTO auth.users (id, email, email_confirmed_at)
        VALUES ('00000000-0000-0000-0000-000000000001', 'admin@example.com', now());
        
        -- Crear perfil de administrador
        INSERT INTO public.profiles (id, first_name, last_name, role)
        VALUES ('00000000-0000-0000-0000-000000000001', 'Admin', 'User', 'admin');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'worker@example.com') THEN
        -- Crear usuario trabajador
        INSERT INTO auth.users (id, email, email_confirmed_at)
        VALUES ('00000000-0000-0000-0000-000000000002', 'worker@example.com', now());
        
        -- Crear perfil de trabajador
        INSERT INTO public.profiles (id, first_name, last_name, role)
        VALUES ('00000000-0000-0000-0000-000000000002', 'Worker', 'User', 'worker');
    END IF;
END
$$;

-- Insertar recibo de ejemplo
INSERT INTO public.receipts (
    id, user_id, project_id, merchant, amount, date, 
    description, image_url, status, category_id
)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '0649781c-5b6f-497a-9f86-d74d97eaa141',
    'Ferretería El Constructor',
    15000.00,
    now(),
    'Compra de cemento',
    'receipts/receipt1.jpg',
    'pending',
    1
)
ON CONFLICT (id) DO NOTHING;

-- Insertar comentario de ejemplo
INSERT INTO public.comments (
    id, receipt_id, user_id, text
)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Factura original entregada a contabilidad'
)
ON CONFLICT (id) DO NOTHING;
