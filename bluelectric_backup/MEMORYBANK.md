# BlueElectric - Documentación del Proyecto

## Descripción General

BlueElectric es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios gestionar gastos y recibos de manera eficiente. La aplicación está diseñada para facilitar el seguimiento de gastos por proyecto, permitiendo a los usuarios capturar imágenes de recibos, organizarlos por proyectos y gestionar su aprobación.

## Tecnologías Utilizadas

- **Frontend**: React Native, Expo
- **Gestión de Estado**: Redux Toolkit, Redux Offline
- **Backend**: Supabase (Autenticación, Base de datos, Almacenamiento)
- **Navegación**: React Navigation
- **UI/UX**: Componentes personalizados, Iconos de Expo Vector Icons

## Estructura del Proyecto

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

## Funcionalidades Principales

### Autenticación

- **Inicio de Sesión**: Autenticación de usuarios mediante email y contraseña
- **Registro**: Creación de nuevas cuentas de usuario
- **Recuperación de Contraseña**: Proceso para restablecer contraseñas olvidadas
- **Gestión de Sesiones y Persistencia de Datos**:
  - **Redux Toolkit**: Para la gestión centralizada del estado de la aplicación.
  - **Redux Offline**: Implementación para gestionar la persistencia de datos y operaciones offline:
    - Sincronización automática de datos cuando se recupera la conexión
    - Manejo de operaciones fallidas con estrategias de reintento
    - Almacenamiento local de datos importantes para trabajo sin conexión
    - Interfaz de usuario adaptada que informa al usuario sobre el estado de sincronización
    - Mejora la experiencia de usuario en áreas con conectividad limitada

### Gestión de Recibos

- **Listado de Recibos**: Visualización de todos los recibos con filtros y búsqueda
- **Detalle de Recibo**: Vista detallada de un recibo con su imagen y metadatos
- **Creación de Recibos**: Captura de imágenes de recibos mediante cámara o galería
- **Edición de Recibos**: Modificación de información de recibos existentes5
- **Aprobación/Rechazo**: Flujo de aprobación para administradores
- **Comentarios**: Sistema de comentarios en recibos para facilitar la comunicación

### Gestión de Proyectos

- **Listado de Proyectos**: Visualización de todos los proyectos con estadísticas
- **Detalle de Proyecto**: Vista detallada de un proyecto con sus recibos asociados
- **Creación de Proyectos**: Creación de nuevos proyectos con nombre y descripción
- **Edición de Proyectos**: Modificación de información de proyectos existentes
- **Activación/Desactivación**: Control del estado de los proyectos

### Funcionalidades Adicionales

- **Modo Sin Conexión**: Soporte completo para trabajar sin conexión con sincronización automática mediante Redux Offline
- **Estadísticas**: Resumen financiero por proyecto y estado de recibos
- **Filtros y Búsqueda**: Capacidad de filtrar y buscar recibos y proyectos

## Roles de Usuario

- **Usuario Regular**: Puede crear, editar y ver sus propios recibos
- **Administrador**: Puede aprobar/rechazar recibos, gestionar proyectos y usuarios

## Pantallas Principales

### Autenticación

1. **LoginScreen**: Pantalla de inicio de sesión
2. **RegisterScreen**: Pantalla de registro de nuevos usuarios
3. **ForgotPasswordScreen**: Pantalla de recuperación de contraseña

### Recibos

1. **ReceiptsListScreen**: Lista de recibos con filtros y búsqueda
2. **ReceiptDetailScreen**: Detalle de un recibo específico
3. **AddReceiptScreen**: Formulario para añadir un nuevo recibo
4. **EditReceiptScreen**: Formulario para editar un recibo existente
5. **AddCommentScreen**: Formulario para añadir comentarios a un recibo

### Proyectos

1. **ProjectsListScreen**: Lista de proyectos con estadísticas
2. **ProjectDetailScreen**: Detalle de un proyecto con sus recibos asociados
3. **AddProjectScreen**: Formulario para crear un nuevo proyecto
4. **EditProjectScreen**: Formulario para editar un proyecto existente

## Flujo de Datos

1. **Autenticación**:
   - El usuario se autentica a través de Supabase Auth
   - Los tokens se almacenan en Redux Persist
   - Las solicitudes posteriores incluyen el token de autenticación

2. **Gestión de Recibos**:
   - Las imágenes se capturan y se suben a Supabase Storage
   - Los metadatos del recibo se almacenan en la base de datos
   - Los recibos pasan por un flujo de aprobación (pendiente → aprobado/rechazado)

3. **Gestión de Proyectos**:
   - Los proyectos se crean y se asocian con recibos
   - Las estadísticas se calculan en base a los recibos asociados

## Estado de Redux

El estado global de la aplicación se gestiona mediante Redux Toolkit con los siguientes slices:

1. **authSlice**: Gestión del estado de autenticación y usuario
2. **receiptsSlice**: Gestión de recibos y comentarios
3. **projectsSlice**: Gestión de proyectos
4. **uiSlice**: Estado de la interfaz de usuario (modo sin conexión, temas, etc.)

## Modelo de Datos

### Usuario
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole; // 'admin' | 'user'
  createdAt: string;
  updatedAt: string;
}
```

### Recibo
```typescript
interface Receipt {
  id: string;
  userId: string;
  projectId: string;
  merchant: string;
  amount: number;
  date: string;
  description?: string;
  imageUrl: string;
  status: ReceiptStatus; // 'pending' | 'approved' | 'rejected'
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}
```

### Proyecto
```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  totalExpenses?: number;
  pendingExpenses?: number;
  approvedExpenses?: number;
  rejectedExpenses?: number;
}
```

### Comentario
```typescript
interface Comment {
  id: string;
  receiptId: string;
  userId: string;
  text: string;
  timestamp: string;
}
```

## Configuración del Entorno

### Variables de Entorno (.env)
```
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Próximos Pasos y Mejoras Futuras

1. **OCR para Recibos**: Implementar reconocimiento óptico de caracteres para extraer automáticamente información de las imágenes de recibos.
   - **Estado**: En desarrollo
   - **Enfoque**: Implementación híbrida con procesamiento local y en la nube
   - **Bibliotecas seleccionadas**:
     - `react-native-text-recognition` para procesamiento básico en dispositivo
     - Integración opcional con Azure Form Recognizer o Google Cloud Vision para precisión mejorada
   - **Campos a extraer**:
     - Fecha del recibo
     - Monto total
     - Nombre del comercio
   - **Plan de implementación**:
     - Fase 1: Procesamiento local para uso offline
     - Fase 2: Integración con servicios en la nube para mayor precisión cuando hay conexión

2. **Sincronización Offline**: Mejorar la experiencia sin conexión permitiendo crear y editar recibos offline y sincronizarlos cuando se recupere la conexión.

3. **Notificaciones Push**: Implementar notificaciones para informar a los usuarios sobre cambios en el estado de sus recibos.

4. **Exportación de Datos**: Añadir funcionalidad para exportar recibos y reportes en formatos como PDF o CSV.

5. **Integración con Servicios Contables**: Conectar con servicios de contabilidad para facilitar la gestión financiera.

6. **Mejoras de UI/UX**: Refinar la interfaz de usuario y añadir animaciones para mejorar la experiencia.

7. **Análisis y Estadísticas Avanzadas**: Implementar gráficos y análisis más detallados de gastos.

## Consideraciones de Seguridad

### Seguridad

**Medidas implementadas**:

- Autenticación gestionada por Supabase Auth
- Control de acceso basado en roles (Administrador/Usuario Regular)
- Todas las conexiones con el backend se realizan a través de HTTPS
- Las contraseñas nunca se almacenan en texto plano, se utilizan los mecanismos de hash de Supabase Auth
- Los tokens de autenticación se almacenan de forma segura utilizando Redux Offline

## Notas de Desarrollo

### Migración de Redux Persist a Redux Offline

Durante el desarrollo del proyecto, se detectó un problema con el uso de `redux-persist`, ya que fue marcado como "no mantenido" por `expo-doctor`. Para solucionar esto y mejorar la experiencia offline, se realizó la siguiente migración:

1. **Cambios en las dependencias**:
   - Se desinstaló redux-persist
   - Se instaló @redux-offline/redux-offline

2. **Modificaciones en la configuración del store**:
   ```typescript
   // Archivo: src/store/index.ts
   // Configuración con redux-offline
   import { offline } from '@redux-offline/redux-offline';
   import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
   
   // Configuración personalizada
   const offlineCustomConfig = {
     ...offlineConfig,
     persistOptions: {
       key: 'root',
       storage: AsyncStorage,
       whitelist: ['auth', 'receipts'],
     },
   };
   
   export const store = configureStore({
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
         serializableCheck: false,
       }),
     enhancers: [offline(offlineCustomConfig)],
   });
   ```

3. **Adaptación de acciones para soporte offline**:
   - Las acciones thunk se reformatearon para usar el patrón de redux-offline
   - Se implementaron acciones de `commit` y `rollback` para manejar éxito/fracaso de operaciones
   - Se añadieron campos de estado a las interfaces para controlar el estado de sincronización

4. **Mejoras en la interfaz de usuario**:
   - Indicadores de estado de sincronización
   - Mensajes adaptados según el estado de conexión
   - Confirmación visual para acciones completadas offline

Esta migración proporciona ventajas importantes como la sincronización automática cuando se recupera la conexión, mejor manejo de errores, y una experiencia de usuario más fluida en condiciones de conectividad limitada.

## Contribución al Proyecto

Para contribuir al proyecto:

1. Clonar el repositorio
2. Instalar dependencias con `npm install`
3. Crear un archivo `.env` con las variables necesarias
4. Ejecutar la aplicación con `npm start`

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. 