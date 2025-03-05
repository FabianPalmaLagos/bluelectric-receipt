# Registro de Decisiones Arquitectónicas

## 1. Migración a SQLite
- **Fecha:** 03/05/2025
- **Decisión:** Migrar de Supabase a SQLite como base de datos principal
- **Contexto:** Necesidad de mejorar el soporte offline y simplificar la arquitectura
- **Consecuencias:**
  - ✅ Mejor soporte offline
  - ✅ Reducción de dependencias externas
  - ✅ Mayor control sobre los datos locales
  - ❌ Mayor complejidad en la sincronización de datos
  - ❌ Necesidad de gestionar manualmente el almacenamiento local

## 2. Selección de Librería SQLite
- **Fecha:** 03/05/2025
- **Decisión:** Usar react-native-sqlite-storage en lugar de expo-sqlite
- **Contexto:** Necesidad de una solución robusta y bien mantenida para SQLite en React Native
- **Alternativas Consideradas:**
  1. expo-sqlite
  2. react-native-sqlite-storage
- **Justificación:**
  - Mayor madurez y estabilidad del proyecto
  - Mejor documentación y soporte comunitario
  - Más flexibilidad en configuraciones avanzadas
  - No dependencia del ecosistema Expo

## 3. Arquitectura Sin Servidor Central
- **Fecha:** 03/05/2025
- **Decisión:** Eliminar el servidor central para sincronización
- **Contexto:** Simplificación de la arquitectura y enfoque en funcionalidad offline
- **Consecuencias:**
  - ✅ Arquitectura más simple
  - ✅ Menor costo de infraestructura
  - ✅ Mayor privacidad de datos
  - ❌ Sin respaldo automático en la nube
  - ❌ Necesidad de implementar mecanismos alternativos de respaldo

## 4. Estructura de Base de Datos Local
- **Fecha:** 03/05/2025
- **Decisión:** Mantener el esquema de base de datos existente con adaptaciones para SQLite
- **Contexto:** Necesidad de preservar la funcionalidad actual mientras se migra a SQLite
- **Cambios Principales:**
  - Mantenimiento de las tablas principales (users, projects, categories, receipts, comments)
  - Adición de campos para control de sincronización local
  - Optimización de índices para consultas frecuentes
- **Consideraciones:**
  - Compatibilidad con la lógica de negocio existente
  - Optimización para operaciones offline
  - Facilidad de migración de datos existentes

## 5. Autenticación Local
- **Fecha:** 03/05/2025
- **Decisión:** Implementar autenticación basada en SQLite sin validación de registro
- **Contexto:** Necesidad de mantener la seguridad y control de acceso sin depender de servicios externos
- **Consecuencias:**
  - ✅ Control total sobre el proceso de autenticación
  - ✅ Funcionamiento offline garantizado
  - ✅ Simplificación del proceso de registro
  - ❌ Menor seguridad en la validación de usuarios nuevos
  - ❌ Necesidad de implementar cifrado local robusto

## 6. Implementación de Autenticación Local
- **Fecha:** 03/05/2025
- **Decisión:** Implementar sistema de autenticación basado en SQLite
- **Contexto:** Necesidad de mantener la autenticación funcionando sin depender de Supabase
- **Cambios Principales:**
  - Migración del AuthSlice para usar SQLite
  - Manejo de IDs adaptado (number en SQLite, string en la app)
  - Implementación de helpers para conversión de tipos
- **Consideraciones:**
  - ✅ Funcionamiento offline completo
  - ✅ Simplificación del proceso de autenticación
  - ✅ Mejor integración con el resto del sistema
  - ❌ Necesidad de implementar seguridad adicional
  - ❌ Gestión manual de sesiones

## 7. Estandarización del Nombre de la Base de Datos
- **Fecha:** 05/03/2025
- **Decisión:** Estandarizar el uso de `bluelectric.db` como nombre de la base de datos en todo el proyecto
- **Contexto:** Se detectó una discrepancia entre el nombre de la base de datos utilizado en el código (`bluelectric.db`) y el nombre utilizado en algunos scripts y documentación (`database.db`)
- **Cambios Realizados:**
  - Eliminación del archivo vacío `database.db`
  - Actualización del script `init-db.js` para usar `bluelectric.db`
  - Actualización de la documentación en `README.md`
  - Creación de documentación específica en `memory-bank/databaseChanges.md`
- **Consecuencias:**
  - ✅ Consistencia en toda la aplicación y documentación
  - ✅ Eliminación de errores al verificar usuarios existentes
  - ✅ Mejor experiencia de usuario al registrar nuevas cuentas
