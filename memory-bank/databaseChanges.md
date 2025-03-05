# Cambios en la Base de Datos

## Estandarización del Nombre de la Base de Datos

### Problema Identificado
Se detectó una discrepancia entre el nombre de la base de datos utilizado en el código (`bluelectric.db`) y el nombre utilizado en algunos scripts y documentación (`database.db`). Esto causaba problemas al intentar registrar usuarios, ya que la aplicación buscaba en `bluelectric.db` mientras que algunas operaciones manuales se realizaban en `database.db`.

### Cambios Realizados
1. **Eliminación de `database.db`**: Se eliminó el archivo vacío `database.db` para evitar confusiones.

2. **Actualización de `init-db.js`**: Se modificó el script de inicialización para que utilice `bluelectric.db` en lugar de `database.db`.

3. **Actualización de la documentación**: Se actualizó el archivo `README.md` para que todas las referencias a la base de datos usen el nombre correcto `bluelectric.db`.

### Beneficios
- Consistencia en toda la aplicación y documentación
- Eliminación de errores al verificar usuarios existentes
- Mejor experiencia de usuario al registrar nuevas cuentas

## Estado Actual de la Base de Datos

La base de datos `bluelectric.db` contiene las siguientes tablas:
- `users`: Usuarios del sistema (administradores y trabajadores)
- `projects`: Proyectos de la empresa
- `categories`: Categorías para clasificar los recibos
- `receipts`: Recibos registrados por los trabajadores
- `comments`: Comentarios sobre los recibos
- `migrations`: Registro de migraciones ejecutadas

La aplicación está configurada para usar `bluelectric.db` según el código en `src/utils/db/database.ts`:
```javascript
const DATABASE_NAME = "bluelectric.db";
```

## Verificación de Emails Duplicados

La función `getUserByEmail` en `src/store/slices/authSlice.ts` utiliza una búsqueda case-insensitive para verificar si un email ya existe en la base de datos:

```javascript
const getUserByEmail = async (email: string): Promise<any> => {
  try {
    // Asegurar que la búsqueda no sea sensible a mayúsculas/minúsculas
    const users = await db.query(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1',
      [email]
    );
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    return null;
  }
};
```

Esta implementación garantiza que no se puedan crear usuarios con emails que solo difieran en mayúsculas/minúsculas. 