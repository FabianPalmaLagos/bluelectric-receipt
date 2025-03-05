# Contexto del Proyecto: Aplicación Móvil de Gestión de Gastos

## Visión General
Esta aplicación móvil está diseñada para la gestión de gastos empresariales, permitiendo a diferentes roles (Administrador y Trabajador) gestionar recibos, categorizarlos y generar reportes. El sistema utiliza OCR para automatizar el proceso de registro de gastos y ofrece funcionalidad tanto online como offline.

## Arquitectura del Sistema

### Frontend
- **Framework Principal:** React Native
- **Gestión de Estado:** 
  - Redux Toolkit (`@reduxjs/toolkit ^2.6.0`)
  - Redux Offline (`@redux-offline/redux-offline ^2.5.2-native.3`)
- **Navegación:** React Navigation v7
- **Testing:** Jest con `@testing-library/react-native`

### Backend y Persistencia
- **Base de Datos Principal:** SQLite
  - Implementación vía `react-native-sqlite-storage`
  - Sistema de autenticación local
  - Soporte completo offline-first
  - Sistema de migración y datos iniciales
  - Operaciones CRUD optimizadas

### Servicios Externos
- **Notificaciones Push:** Firebase (`^11.4.0`)
- **OCR:** `react-native-text-recognition ^1.0.2`

## Estructura de Base de Datos

### Tablas Principales

#### users
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `nombre` TEXT NOT NULL
- `email` TEXT NOT NULL UNIQUE
- `rol` TEXT NOT NULL CHECK (rol IN ('ADMINISTRADOR', 'TRABAJADOR'))
- `foto_perfil` TEXT
- `fecha_alta` TEXT NOT NULL
- `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP

#### projects
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `nombre` TEXT NOT NULL
- `descripcion` TEXT
- `fecha_creacion` TEXT NOT NULL
- `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP

#### categories
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `nombre` TEXT NOT NULL UNIQUE
- `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP

#### receipts
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `monto` REAL NOT NULL
- `fecha` TEXT NOT NULL
- `comercio` TEXT NOT NULL
- `imagenUri` TEXT NOT NULL
- `estado` TEXT NOT NULL CHECK (estado IN ('pendiente', 'aprobado', 'rechazado'))
- `motivo_rechazo` TEXT
- `usuario_id` INTEGER NOT NULL REFERENCES users(id)
- `proyecto_id` INTEGER NOT NULL REFERENCES projects(id)
- `categoria_id` INTEGER NOT NULL REFERENCES categories(id)
- `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP

#### comments
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `texto` TEXT NOT NULL
- `fecha` TEXT NOT NULL
- `recibo_id` INTEGER NOT NULL REFERENCES receipts(id)
- `usuario_id` INTEGER NOT NULL REFERENCES users(id)
- `created_at` TEXT DEFAULT CURRENT_TIMESTAMP
- `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP

## Interfaces de Usuario

### Diseño Visual
- **Tema:** Soporte para modo claro y oscuro
- **Paleta de Colores:**
  - `#002F36`
  - `#005D9F`
  - `#00A0A0`
  - `#0000FF`
  - `#00CFFF`
  - `#0096D2`

### Componentes Principales
- Botón flotante "+" para carga de recibos
- Vista de recibos en tarjetas o cuadrículas
- Filtros rápidos mediante tabs o menús desplegables
- Interfaz de validación OCR (OCRValidationView)

## Estado de Implementación

### Completado
- ✅ Estructura de Base de Datos SQLite
- ✅ Sistema de autenticación local
- ✅ Migración de datos iniciales
- ✅ OCR y Validación
- ✅ Estructura base del proyecto

### En Progreso
- 🔄 Sincronización offline con Redux Offline
- 🔄 Optimización de consultas SQLite
- 🔄 Sistema de respaldo local
- 🔄 Vistas de reportes
- 🔄 Carga masiva de recibos