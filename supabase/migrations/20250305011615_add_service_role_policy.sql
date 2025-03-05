-- Añadir política para permitir al rol de servicio insertar perfiles
-- Esta política es necesaria para que el backend pueda crear perfiles durante el registro

-- Verificar si la política ya existe antes de crearla
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Service role can insert profiles'
        AND cmd = 'INSERT'
    ) THEN
        -- Crear la política si no existe
        EXECUTE 'CREATE POLICY "Service role can insert profiles" ON public.profiles FOR INSERT TO service_role WITH CHECK (true)';
    END IF;
END
$$;
