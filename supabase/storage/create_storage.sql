-- Configuración del Storage en Supabase para imágenes de recibos

-- Crear un bucket para las imágenes de recibos (esto se hace normalmente desde la interfaz de Supabase)
-- Nombre: receipts
-- Acceso público: desactivado
-- Políticas RLS: activadas

-- Configurar políticas para el bucket
-- Allow users to upload their own receipts
CREATE POLICY "Users can upload own receipts" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    auth.uid() = (storage.foldername())[1]::uuid AND
    (storage.filename())[2] = 'receipts'
  );

-- Users can view their own receipts
CREATE POLICY "Users can view own receipts" 
  ON storage.objects FOR SELECT 
  USING (
    auth.uid() = (storage.foldername())[1]::uuid AND
    (storage.filename())[2] = 'receipts'
  );

-- Admin can view all receipts
CREATE POLICY "Admin can view all receipts" 
  ON storage.objects FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    ) AND
    (storage.filename())[2] = 'receipts'
  ); 