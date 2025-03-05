# Arquitectura del Proyecto

Este documento describe la arquitectura completa de la aplicación BlueElectric Receipt, detallando la estructura del proyecto, patrones de diseño implementados y los flujos de datos principales.

## Estructura General del Proyecto

```
bluelectric/
├── .env                  # Variables de entorno (Supabase URL, Anon Key)
├── .gitignore            # Archivos y directorios ignorados por Git
├── App.tsx               # Punto de entrada de la aplicación
├── app.json              # Configuración de Expo
├── babel.config.js       # Configuración de Babel
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── src/                  # Código fuente
    ├── api/              # Configuración de API y servicios
    │   └── supabase.ts   # Cliente de Supabase
    ├── components/       # Componentes reutilizables
    ├── constants/        # Constantes de la aplicación (temas, colores, etc.)
    ├── hooks/            # Hooks personalizados
    ├── navigation/       # Configuración de navegación
    ├── screens/          # Pantallas de la aplicación
    │   ├── auth/         # Pantallas de autenticación
    │   ├── receipts/     # Pantallas de gestión de recibos
    │   └── projects/     # Pantallas de gestión de proyectos
    ├── store/            # Configuración de Redux
    │   ├── index.ts      # Configuración del store
    │   └── slices/       # Slices de Redux
    ├── types/            # Definiciones de tipos TypeScript
    └── utils/            # Utilidades y funciones auxiliares
```

## Arquitectura de la Aplicación

BlueElectric Receipt sigue una arquitectura basada en componentes con una gestión centralizada del estado mediante Redux. La aplicación se comunica con Supabase para autenticación, almacenamiento de datos y gestión de archivos.

### Diagrama de Arquitectura

```
+---------------------+       +----------------------+
|                     |       |                      |
|  Componentes React  |<----->|  Estado Redux        |
|  Native             |       |  (Slices)            |
|                     |       |                      |
+---------------------+       +----------------------+
          |                              |
          v                              v
+---------------------+       +----------------------+
|                     |       |                      |
|  React Navigation   |       |  Persistencia        |
|  (Flujo de Pantallas)|       |  (Redux Persist)     |
|                     |       |                      |
+---------------------+       +----------------------+
          |                              |
          v                              v
+--------------------------------------------------------+
|                                                        |
|                Supabase Client                         |
|                                                        |
+--------------------------------------------------------+
          |                |                  |
          v                v                  v
+----------------+  +----------------+  +----------------+
|                |  |                |  |                |
| Autenticación  |  | Base de Datos  |  | Almacenamiento |
|                |  |                |  |                |
+----------------+  +----------------+  +----------------+
```

## Patrones de Diseño

### 1. Patrón Redux (Flux)

La aplicación implementa el patrón Redux para la gestión del estado, siguiendo el flujo unidireccional de datos:

- **Actions**: Describen eventos que ocurren en la aplicación
- **Reducers**: Actualizan el estado basado en las acciones
- **Store**: Almacena el estado de la aplicación
- **Selectors**: Extraen datos específicos del estado

### 2. Container/Presentational Pattern

Separación de componentes en:

- **Componentes de presentación**: Se enfocan en cómo se ven las cosas (UI)
- **Componentes contenedores**: Se enfocan en cómo funcionan las cosas (lógica)

### 3. Provider Pattern

Utilizamos Context API y Redux Provider para hacer disponible el estado global a toda la aplicación.

## Gestión del Estado

La aplicación utiliza Redux Toolkit para gestionar el estado global, dividido en los siguientes slices:

### authSlice

Gestiona el estado de autenticación:
- Información del usuario actual
- Estado de inicio de sesión/registro
- Tokens de autenticación

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

### receiptsSlice

Gestiona el estado de los recibos:
- Lista de recibos
- Recibo actual seleccionado
- Estado de carga y errores
- Comentarios asociados a recibos

```typescript
interface ReceiptsState {
  receipts: Receipt[];
  currentReceipt: Receipt | null;
  loading: boolean;
  error: string | null;
}
```

### projectsSlice

Gestiona el estado de los proyectos:
- Lista de proyectos
- Proyecto actual seleccionado
- Estado de carga y errores

```typescript
interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}
```

### uiSlice

Gestiona el estado de la interfaz de usuario:
- Modo oscuro/claro
- Estado de conectividad (online/offline)
- Mensajes globales y notificaciones

```typescript
interface UIState {
  theme: 'light' | 'dark';
  isOffline: boolean;
  globalMessage: string | null;
}
```

## Flujo de Navegación

La aplicación utiliza React Navigation para gestionar la navegación entre pantallas, con los siguientes navegadores:

### 1. Root Navigator
- Controla la navegación entre el flujo de autenticación y la aplicación principal
- Utiliza el estado de autenticación para determinar qué flujo mostrar

### 2. Auth Navigator
- Gestiona las pantallas de autenticación:
  - Login
  - Registro
  - Recuperación de contraseña

### 3. Main Navigator
- Implementa un Tab Navigator para las secciones principales:
  - Recibos
  - Proyectos
  - Perfil

### 4. Receipts Navigator
- Gestiona la navegación entre pantallas de recibos:
  - Lista de recibos
  - Detalle de recibo
  - Añadir recibo
  - Editar recibo
  - Añadir comentario

### 5. Projects Navigator
- Gestiona la navegación entre pantallas de proyectos:
  - Lista de proyectos
  - Detalle de proyecto
  - Añadir proyecto
  - Editar proyecto

## Gestión de Datos

### Supabase como Backend

La aplicación utiliza Supabase como backend, aprovechando sus características:

1. **Autenticación**:
   - Registro/inicio de sesión con email/contraseña
   - Recuperación de contraseña
   - Gestión de sesiones

2. **Base de Datos**:
   - Tablas PostgreSQL para almacenar datos estructurados
   - Consultas en tiempo real con RLS (Row Level Security)
   - Relaciones entre tablas

3. **Almacenamiento**:
   - Almacenamiento de imágenes de recibos
   - Políticas de acceso seguras

### Estructura de la Base de Datos

```
+-----------------+       +----------------+       +----------------+
|                 |       |                |       |                |
|     Users       |<------+    Receipts    +------>|    Projects    |
|                 |       |                |       |                |
+-----------------+       +----------------+       +----------------+
        |                        |
        |                        |
        v                        v
+-----------------+       +----------------+
|                 |       |                |
|    Profiles     |       |    Comments    |
|                 |       |                |
+-----------------+       +----------------+
```

## Manejo de Errores

La aplicación implementa un sistema de manejo de errores en múltiples niveles:

1. **Errores de API**: Capturados en los thunks de Redux y almacenados en el estado
2. **Errores de UI**: Mostrados al usuario mediante Alert o componentes Toast
3. **Errores de Red**: Detección de estado offline y manejo adecuado
4. **Errores de Validación**: Validación de formularios antes de envío

## Consideraciones de Rendimiento

1. **Memoización**: Uso de React.memo, useMemo y useCallback para optimizar renderizados
2. **Paginación**: Carga incremental de datos para listas largas
3. **Lazy Loading**: Carga diferida de componentes y rutas menos utilizadas
4. **Optimización de Imágenes**: Compresión y redimensionamiento de imágenes antes de subir

## Seguridad

1. **Políticas RLS**: Control de acceso a nivel de fila en Supabase
2. **Validación**: Validación de datos tanto en cliente como en servidor
3. **Sanitización**: Limpieza de datos de entrada para prevenir inyecciones
4. **Protección de Rutas**: Navegación protegida basada en autenticación y roles

## Pruebas

La arquitectura está diseñada para facilitar diferentes tipos de pruebas:

1. **Pruebas Unitarias**: Para lógica de negocio aislada (reducers, selectors, utilidades)
2. **Pruebas de Componentes**: Para componentes UI individuales
3. **Pruebas de Integración**: Para flujos completos que involucran múltiples componentes
4. **E2E**: Para validar flujos completos de usuario 