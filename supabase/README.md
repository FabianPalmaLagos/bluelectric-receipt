# Configuración de Supabase para BlueElectric Receipt

Este directorio contiene todos los archivos relacionados con la configuración y el uso de Supabase en el proyecto BlueElectric Receipt.

## Información de Conexión

- **Project URL**: https://izcuyqehwvnstcaqfmod.supabase.co
- **Project ID**: `izcuyqehwvnstcaqfmod`
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Y3V5cWVod3Zuc3RjYXFmbW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4ODkwNzksImV4cCI6MjA1NjQ2NTA3OX0.ivhliX3AysO8ZmbBU6fvYa-yH5OSD-FX4eGB76bwZPE`

## Estructura de directorios

```
supabase/
├── config/             # Archivos de configuración
│   ├── .env            # Variables de entorno para Supabase MCP Server
│   └── supabase-client.ts  # Configuración del cliente de Supabase para la aplicación
├── schema/             # Esquemas y definiciones de tablas
│   ├── create_tables.sql   # SQL para crear las tablas principales
│   └── supabase_schema.sql # Esquema completo de la base de datos
├── storage/            # Configuración de almacenamiento
│   └── create_storage.sql  # SQL para configurar buckets de almacenamiento
└── seed/               # Datos de prueba
    └── supabase_seed_data.sql  # SQL para insertar datos de prueba
```

## Pasos para Configurar la Base de Datos

### 1. Acceder al Panel de Control de Supabase

1. Visita [app.supabase.com](https://app.supabase.com) e inicia sesión con tu cuenta.
2. Selecciona el proyecto `izcuyqehwvnstcaqfmod` o crea uno nuevo si es necesario.

### 2. Configurar el Esquema de la Base de Datos

1. En el panel de control de Supabase, navega a la sección "SQL Editor".
2. Crea una nueva consulta y copia el contenido del archivo `schema/create_tables.sql`.
3. Ejecuta la consulta para crear las tablas, índices, restricciones y políticas de seguridad.

### 3. Configurar Almacenamiento para Imágenes de Recibos

1. En el panel de control de Supabase, navega a la sección "SQL Editor".
2. Crea una nueva consulta y copia el contenido del archivo `storage/create_storage.sql`.
3. Ejecuta la consulta para configurar el bucket de almacenamiento y sus políticas.

### 4. Cargar Datos de Ejemplo (Opcional)

1. En el panel de control de Supabase, navega a la sección "SQL Editor".
2. Crea una nueva consulta y copia el contenido del archivo `seed/supabase_seed_data.sql`.
3. **Importante**: Antes de ejecutar, reemplaza `'USER_ID_1'` y `'USER_ID_2'` con IDs reales de usuarios de tu sistema.
4. Ejecuta la consulta para insertar los datos de ejemplo.

### 5. Configurar Autenticación

1. En el panel de control de Supabase, navega a la sección "Authentication".
2. Configura los proveedores de autenticación que deseas utilizar (correo electrónico/contraseña, Google, etc.).
3. Personaliza las plantillas de correo electrónico para invitaciones, restablecimiento de contraseña, etc.

## Conexión desde la aplicación

La aplicación se conecta a Supabase utilizando la configuración en `config/supabase-client.ts`. Este archivo exporta una instancia del cliente de Supabase que se puede importar y utilizar en cualquier parte de la aplicación.

```typescript
import { supabase } from 'path/to/supabase/config/supabase-client';

// Ejemplo de uso
const { data, error } = await supabase
  .from('receipts')
  .select('*');
```

## Variables de entorno

Las variables de entorno necesarias para el funcionamiento de Supabase MCP Server se encuentran en el archivo `.env` en el directorio `config/`. Estas variables incluyen:

- `SUPABASE_PROJECT_REF`: Referencia del proyecto
- `SUPABASE_DB_PASSWORD`: Contraseña de la base de datos
- `SUPABASE_REGION`: Región donde está alojado el proyecto
- `SUPABASE_ACCESS_TOKEN`: Token de acceso para la API de gestión
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de rol de servicio para el SDK de administración de autenticación

## Estructura de la Base de Datos

### Tablas Principales

1. **users** (gestionada por Supabase Auth)
   - Almacena información de los usuarios (administradores y trabajadores).

2. **projects**
   - Almacena los proyectos disponibles en el sistema.

3. **categories**
   - Almacena las categorías de gastos.

4. **receipts**
   - Almacena los recibos y sus datos (monto, fecha, descripción, etc.).

5. **comments**
   - Almacena comentarios en los recibos.

6. **notifications**
   - Almacena notificaciones push para los usuarios.

### Relaciones

- Un usuario puede tener muchos recibos.
- Un proyecto puede tener muchos recibos.
- Una categoría puede estar asociada a muchos recibos.
- Un recibo puede tener muchos comentarios.
- Un usuario puede tener muchas notificaciones.

## Seguridad y Permisos

Se han configurado políticas de seguridad (RLS) para garantizar que:

- Los trabajadores solo pueden ver y gestionar sus propios recibos.
- Los administradores pueden ver y gestionar todos los recibos.
- Solo los administradores pueden crear, editar y eliminar proyectos y categorías.
- Los usuarios solo pueden ver y gestionar sus propias notificaciones.

## Solución de Problemas

Si encuentras problemas al ejecutar los scripts SQL:

1. Asegúrate de que estás conectado con un usuario que tiene permisos suficientes.
2. Ejecuta los comandos por partes si hay errores específicos.
3. Verifica que las tablas y tipos mencionados en las restricciones de clave foránea existan antes de crear las restricciones.

## Próximos Pasos

Una vez configurada la base de datos, puedes:

1. Conectar tu aplicación React Native a Supabase utilizando el cliente de Supabase.
2. Implementar la lógica de autenticación y autorización.
3. Desarrollar las funcionalidades de gestión de recibos, proyectos y categorías.
4. Implementar la integración con OCR para el reconocimiento automático de datos en los recibos. 