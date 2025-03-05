-- Añadir política de inserción para la tabla profiles
-- Esta política permite a los usuarios insertar sus propios perfiles y a funciones administrativas insertar cualquiera
-- Es necesaria para que el registro de usuarios funcione correctamente

-- Verificar si la política ya existe antes de crearla
DO $$
BEGIN
    -- Eliminar todas las políticas de inserción de perfiles
    DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Allow profile insertion with more flexibility" ON public.profiles;
    
    -- Crear política muy permisiva para la inserción de perfiles
    -- Esta política permite inserciones desde funciones edge (service_role)
    -- y desde el cliente cuando el ID del usuario coincide
    CREATE POLICY "Super permissive profile insertion" 
    ON public.profiles FOR INSERT 
    WITH CHECK (
        -- El usuario puede insertar su propio perfil
        auth.uid() = id 
        OR 
        -- O si tiene rol de servicio (las funciones Edge usan este rol)
        auth.role() = 'service_role'
        OR
        -- O si no hay JWT (para webhooks y otras operaciones sin autenticación)
        auth.jwt() IS NULL
    );
END
$$;
