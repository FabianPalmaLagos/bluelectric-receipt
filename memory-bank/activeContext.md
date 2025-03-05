# Base de Datos SQLite - Solución de Problemas

## Problemas Resueltos

### 1. Ciclos de Dependencia
- Se detectaron ciclos de dependencia entre archivos de base de datos
- Se separó la lógica en archivos independientes:
  * database.ts - Implementación nativa
  * database.web.ts - Implementación web
  * index.ts - Punto de entrada unificado
  * migration.ts - Lógica de migración

### 2. Restricciones CHECK
- Se corrigió el problema con la restricción CHECK para roles de usuario
- Los roles deben ser exactamente 'ADMINISTRADOR' o 'TRABAJADOR'
- Se implementó conversión automática a mayúsculas
- Se agregó COLLATE NOCASE para flexibilidad

### 3. Inicialización y Migración
- Se implementó un flag para evitar migraciones duplicadas
- Se mejoró la verificación de datos existentes
- Se agregaron datos iniciales predefinidos:
  * Categorías por defecto
  * Usuarios admin y trabajador por defecto

### 4. Soporte Multiplataforma
- Implementación web usando localStorage
- Implementación nativa usando SQLite
- Detección automática de plataforma
- Interfaz común DatabaseConnection

### 5. Estandarización del Nombre de la Base de Datos
- Se detectó una discrepancia entre nombres de base de datos (`database.db` vs `bluelectric.db`)
- Se estandarizó el uso de `bluelectric.db` en todo el proyecto
- Se actualizaron scripts y documentación para usar el nombre correcto
- Se eliminó el archivo vacío `database.db` para evitar confusiones

## Estructura de la Base de Datos

### Tablas Principales
1. users
   - Roles: ADMINISTRADOR, TRABAJADOR
   - Campos únicos: email
   - Fecha alta requerida

2. categories
   - Nombre único
   - Categorías predefinidas

3. projects
   - Nombre y fecha requeridos
   - Descripción opcional

4. receipts
   - Estados: pendiente, aprobado, rechazado
   - Referencias a users, projects, categories

5. comments
   - Referencias a receipts y users

## Uso

### Inicialización
```typescript
import { db } from './utils/db';

// La base de datos se inicializa automáticamente
await db.init();
```

### Inserción de Usuarios
```typescript
await db.insert('users', {
  nombre: 'Nombre',
  email: 'email@ejemplo.com',
  rol: 'ADMINISTRADOR', // o 'TRABAJADOR'
  fecha_alta: new Date().toISOString()
});
```

### Migración
```typescript
import { runMigration } from './utils/db';

// Ejecutar migración inicial
await runMigration();
```

## Notas Importantes
- Los roles son case-insensitive en queries pero se almacenan en mayúsculas
- La migración solo se ejecuta una vez por sesión
- Las operaciones verifican datos existentes antes de insertar
- Errores de duplicados son manejados gracefully

## Solución de Errores
- CHECK constraint: Asegurar roles correctos en mayúsculas
- UNIQUE constraint: Verificar duplicados antes de insertar
- Errores de inicialización: Verificar estado de la base de datos