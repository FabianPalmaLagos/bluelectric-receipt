# BlueElectric Receipt

Aplicación móvil para la gestión de gastos empresariales desarrollada con React Native y Supabase.

## Descripción

BlueElectric Receipt es una aplicación móvil que permite a los usuarios (Administradores y Trabajadores) gestionar recibos de gastos empresariales. La aplicación ofrece funcionalidades como:

- Captura de recibos mediante la cámara del dispositivo
- Reconocimiento automático de texto (OCR) para extraer información de los recibos
- Categorización de gastos
- Flujo de aprobación/rechazo de recibos
- Funcionamiento offline con sincronización automática
- Generación de reportes
- Notificaciones push en tiempo real

## Tecnologías Utilizadas

- **Frontend:** React Native / Expo
- **Backend & Base de datos:** Supabase
- **Autenticación:** Supabase Auth
- **Almacenamiento:** Supabase Storage
- **Gestión de estado:** Redux Toolkit
- **Persistencia offline:** Redux Offline
- **Notificaciones push:** Firebase Cloud Messaging
- **OCR:** React Native Text Recognition

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Expo CLI
- Cuenta en Supabase
- Cuenta en Firebase (para notificaciones push)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/bluelectric.git
   cd bluelectric
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
     ```
     SUPABASE_URL=tu_url_de_supabase
     SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     ```

4. Iniciar la aplicación:
   ```bash
   npm start
   # o
   yarn start
   ```

## Estructura del Proyecto

```
bluelectric/
├── src/
│   ├── api/            # Configuración de API y servicios
│   ├── assets/         # Imágenes, fuentes y otros recursos
│   ├── components/     # Componentes reutilizables
│   ├── constants/      # Constantes y configuración
│   ├── hooks/          # Custom hooks
│   ├── navigation/     # Configuración de navegación
│   ├── screens/        # Pantallas de la aplicación
│   ├── store/          # Configuración de Redux
│   │   └── slices/     # Slices de Redux
│   ├── types/          # Definiciones de tipos TypeScript
│   └── utils/          # Funciones de utilidad
├── App.tsx             # Punto de entrada de la aplicación
├── app.json            # Configuración de Expo
├── babel.config.js     # Configuración de Babel
├── package.json        # Dependencias del proyecto
└── tsconfig.json       # Configuración de TypeScript
```

## Características

### Rol Administrador
- Gestión de proyectos y categorías de gastos
- Aprobación/rechazo de recibos
- Comentarios y feedback a los trabajadores
- Generación de reportes exportables
- Visión global de gastos por proyecto o categoría

### Rol Trabajador
- Captura de recibos mediante cámara o galería
- OCR automático con corrección manual
- Categorización de recibos
- Filtrado avanzado
- Carga masiva de recibos
- Modo offline con sincronización automática

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Contacto

Para cualquier consulta o sugerencia, por favor contactar a [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com).

## Inicialización de la Base de Datos

Para inicializar la base de datos con las tablas y datos iniciales necesarios, sigue estos pasos:

1. Instala las dependencias:
   ```
   npm install
   ```

2. Ejecuta el script de inicialización:
   ```
   npm run init-db
   ```

Este proceso creará una base de datos SQLite (`bluelectric.db`) con las siguientes tablas:
- `users`: Usuarios del sistema (administradores y trabajadores)
- `projects`: Proyectos de la empresa
- `categories`: Categorías para clasificar los recibos
- `receipts`: Recibos registrados por los trabajadores
- `comments`: Comentarios sobre los recibos
- `migrations`: Registro de migraciones ejecutadas

### Datos iniciales

El script de inicialización crea automáticamente:

- **Usuarios**:
  - Admin (admin@bluelectric.cl) - Rol: ADMINISTRADOR
  - Trabajador (trabajador@bluelectric.cl) - Rol: TRABAJADOR

- **Categorías**:
  - Materiales
  - Comida
  - Alojamiento
  - Transporte
  - Herramientas
  - Otros

- **Proyectos**:
  - Proyecto Demo (creado manualmente para pruebas)

## Estructura de la Base de Datos

### Tabla `users`
```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  rol TEXT NOT NULL CHECK (rol IN ('ADMINISTRADOR', 'TRABAJADOR')) COLLATE NOCASE,
  foto_perfil TEXT,
  fecha_alta TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

### Tabla `projects`
```sql
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  fecha_creacion TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

### Tabla `categories`
```sql
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

### Tabla `receipts`
```sql
CREATE TABLE IF NOT EXISTS receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  monto REAL NOT NULL,
  fecha TEXT NOT NULL,
  comercio TEXT NOT NULL,
  imagenUri TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')) COLLATE NOCASE,
  motivo_rechazo TEXT,
  usuario_id INTEGER NOT NULL,
  proyecto_id INTEGER NOT NULL,
  categoria_id INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (proyecto_id) REFERENCES projects (id) ON DELETE CASCADE,
  FOREIGN KEY (categoria_id) REFERENCES categories (id) ON DELETE CASCADE
)
```

### Tabla `comments`
```sql
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  fecha TEXT NOT NULL,
  recibo_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recibo_id) REFERENCES receipts (id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES users (id) ON DELETE CASCADE
)
```

## Consultas útiles

Para verificar los datos en la base de datos, puedes usar los siguientes comandos:

```bash
# Listar todas las tablas
sqlite3 bluelectric.db ".tables"

# Ver usuarios
sqlite3 bluelectric.db "SELECT * FROM users;"

# Ver categorías
sqlite3 bluelectric.db "SELECT * FROM categories;"

# Ver proyectos
sqlite3 bluelectric.db "SELECT * FROM projects;"

# Ver migraciones
sqlite3 bluelectric.db "SELECT * FROM migrations;"
``` 