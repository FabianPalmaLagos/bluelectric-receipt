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