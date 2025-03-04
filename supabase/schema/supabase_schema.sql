-- Actualizar la tabla receipts para incluir campos adicionales
ALTER TABLE receipts 
ADD COLUMN IF NOT EXISTS merchant TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS category_id INTEGER,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Crear la tabla categories para categorías de gastos
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear la tabla comments para comentarios en los recibos
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    receipt_id INTEGER REFERENCES receipts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear la tabla notifications para notificaciones push
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    data JSONB,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Añadir restricciones de clave foránea a la tabla receipts
ALTER TABLE receipts
ADD CONSTRAINT fk_receipts_user
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE receipts
ADD CONSTRAINT fk_receipts_project
FOREIGN KEY (project_id) 
REFERENCES projects(id) ON DELETE SET NULL;

ALTER TABLE receipts
ADD CONSTRAINT fk_receipts_category
FOREIGN KEY (category_id) 
REFERENCES categories(id) ON DELETE SET NULL;

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX IF NOT EXISTS idx_receipts_user_id ON receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_receipts_project_id ON receipts(project_id);
CREATE INDEX IF NOT EXISTS idx_receipts_category_id ON receipts(category_id);
CREATE INDEX IF NOT EXISTS idx_receipts_date ON receipts(date);
CREATE INDEX IF NOT EXISTS idx_receipts_status ON receipts(status);
CREATE INDEX IF NOT EXISTS idx_comments_receipt_id ON comments(receipt_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- Crear un tipo ENUM para los estados de los recibos
CREATE TYPE IF NOT EXISTS receipt_status AS ENUM ('pending', 'approved', 'rejected');

-- Modificar la columna status para usar el tipo ENUM
ALTER TABLE receipts
ALTER COLUMN status TYPE receipt_status USING status::receipt_status;

-- Crear un tipo ENUM para los roles de usuario
CREATE TYPE IF NOT EXISTS user_role AS ENUM ('admin', 'worker');

-- Crear una función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers para actualizar el campo updated_at automáticamente
CREATE TRIGGER update_receipts_updated_at
BEFORE UPDATE ON receipts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Crear políticas de seguridad RLS (Row Level Security)

-- Habilitar RLS en todas las tablas
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla receipts
CREATE POLICY "Usuarios pueden ver sus propios recibos"
ON receipts FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Trabajadores pueden crear sus propios recibos"
ON receipts FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Trabajadores pueden actualizar sus propios recibos"
ON receipts FOR UPDATE
TO authenticated
USING (user_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Administradores pueden eliminar recibos"
ON receipts FOR DELETE
TO authenticated
USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

-- Políticas para la tabla projects
CREATE POLICY "Todos pueden ver proyectos"
ON projects FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Solo administradores pueden crear proyectos"
ON projects FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Solo administradores pueden actualizar proyectos"
ON projects FOR UPDATE
TO authenticated
USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Solo administradores pueden eliminar proyectos"
ON projects FOR DELETE
TO authenticated
USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

-- Políticas para la tabla categories
CREATE POLICY "Todos pueden ver categorías"
ON categories FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Solo administradores pueden crear categorías"
ON categories FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Solo administradores pueden actualizar categorías"
ON categories FOR UPDATE
TO authenticated
USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Solo administradores pueden eliminar categorías"
ON categories FOR DELETE
TO authenticated
USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

-- Políticas para la tabla comments
CREATE POLICY "Usuarios pueden ver comentarios en sus recibos"
ON comments FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM receipts
        WHERE receipts.id = comments.receipt_id AND receipts.user_id = auth.uid()
      ) OR
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

CREATE POLICY "Usuarios pueden crear comentarios"
ON comments FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Usuarios pueden actualizar sus propios comentarios"
ON comments FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Usuarios pueden eliminar sus propios comentarios"
ON comments FOR DELETE
TO authenticated
USING (user_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
      ));

-- Políticas para la tabla notifications
CREATE POLICY "Usuarios pueden ver sus propias notificaciones"
ON notifications FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Sistema puede crear notificaciones"
ON notifications FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuarios pueden marcar sus notificaciones como leídas"
ON notifications FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Usuarios pueden eliminar sus propias notificaciones"
ON notifications FOR DELETE
TO authenticated
USING (user_id = auth.uid()); 