-- Política de inserción en la tabla profiles con más permisos
-- Esta migración resuelve el problema de "new row violates row-level security policy for table profiles"

-- Primero, eliminar cualquier política de inserción existente para evitar conflictos
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow profile insertion with more flexibility" ON public.profiles;
DROP POLICY IF EXISTS "Super permissive profile insertion" ON public.profiles;

-- Crear una política altamente permisiva para la inserción de perfiles
-- Esta política permite:
-- 1. A los usuarios insertar su propio perfil (cuando auth.uid() = id)
-- 2. A las funciones Edge con rol de servicio insertar cualquier perfil
-- 3. A los webhooks sin JWT insertar perfiles

CREATE POLICY "Super permissive profile insertion" 
ON public.profiles FOR INSERT 
WITH CHECK (
    -- El usuario puede insertar su propio perfil
    auth.uid() = id 
    OR 
    -- Las funciones Edge usan el rol de servicio
    current_setting('role', true) = 'service_role'
    OR
    -- Para webhooks y otras operaciones sin autenticación
    auth.jwt() IS NULL
);

-- Si la tabla no existe, no hacer nada
DO $$
BEGIN
    -- Verificar si tenemos que habilitar RLS
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND rowsecurity = true
    ) THEN
        -- Habilitar RLS si no está habilitado
        ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END
$$;
