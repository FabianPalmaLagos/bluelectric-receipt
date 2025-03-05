A continuación se presenta el **Project Brief** actualizado para usar **SQLite** en lugar de Supabase como base de datos principal. Todos los demás aspectos del proyecto (frontend en React Native, OCR, notificaciones push con Firebase, etc.) se mantienen, salvo los ajustes necesarios para la sustitución de la capa de datos.

---

# Project Brief: Aplicación Móvil de Gestión de Gastos con React Native y SQLite

## 1. Resumen del Proyecto
El objetivo es desarrollar una **aplicación móvil de gestión de gastos empresariales** que permita a diferentes roles (Administrador y Trabajador) subir y gestionar recibos, categorizarlos, aplicar estados de aprobación y generar reportes. Se busca automatizar el proceso de registro de gastos mediante **OCR**, ofreciendo una experiencia de usuario fluida, con acceso tanto online como offline, y notificaciones push en tiempo real.

---

## 2. Alcance y Funcionalidades Principales

### 2.1 Rol Administrador
- **Gestión de proyectos**: Crear y editar proyectos, así como definir categorías de gastos.  
- **Estados de recibos**: Aprobar, rechazar o marcar como pendiente los recibos, con opción de incluir motivos de rechazo.  
- **Comentarios y feedback**: Agregar notas en los recibos y solicitar más detalles a los trabajadores mediante notificaciones push.  
- **Reportes exportables**: Generar reportes de gastos (PDF o Excel) con filtros de fecha y categoría.  
- **Visión global de gastos**: Consultar de forma rápida el gasto total por proyecto o categoría.

### 2.2 Rol Trabajador
- **Captura de recibos**: Subir fotos de recibos a través de la cámara o galería del dispositivo.  
- **OCR automatizado**: Reconocer datos esenciales (fecha, monto, comercio) y permitir correcciones manuales.  
- **Categorización**: Asignar categorías (Materiales, Comida, Alojamiento, etc.) a cada recibo.  
- **Filtrado avanzado**: Buscar recibos por proyecto, rango de fechas, comercio o categoría.  
- **Carga masiva de recibos**: Enviar múltiples recibos en un solo paso (ej.: todos los de un día).  
- **Modo offline y auto-guardado**: Almacenar temporalmente la información y sincronizar con el servidor cuando haya conexión.

---

## 3. Tecnologías Principales
- **Frontend:** React Native  
- **Backend y Base de datos:** 
  - Node.js/Express (o similar) para exponer servicios.
  - **SQLite** (vía librerías como `react-native-sqlite-storage`, `expo-sqlite` u otra alternativa).  
- **Notificaciones push:** Firebase (`^11.4.0`)  
- **Gestión de estado y persistencia offline:** 
  - Redux Toolkit (`@reduxjs/toolkit ^2.6.0`)
  - Redux Offline (`@redux-offline/redux-offline ^2.5.2-native.3`)
- **OCR:** `react-native-text-recognition ^1.0.2`
- **Navegación:** React Navigation v7
- **Testing:** Jest con `@testing-library/react-native`

---

## 4. Base de Datos: SQLite

### 4.1 Estructura y Consideraciones
La aplicación utilizará **SQLite** como base de datos local para almacenar la información crítica de la gestión de gastos. Esto facilita:
1. **Modo offline**: Los datos se guardan directamente en el dispositivo, permitiendo a los usuarios acceder y registrar información sin conexión.
2. **Sincronización**: Al restablecer la conexión, se puede implementar un sistema de sincronización con un servidor remoto (opcional) para respaldo y reportes consolidados.
3. **Seguridad**: Se pueden emplear cifrado de datos o encriptación del archivo SQLite para mayor protección de la información.

### 4.2 Tablas Principales
- **Usuarios** (`users`):  
  - `id` (PRIMARY KEY)  
  - `nombre`  
  - `email`  
  - `rol` (ADMINISTRADOR | TRABAJADOR)  
  - Campos adicionales según necesidades (ej. foto de perfil, fecha de alta, etc.)

- **Proyectos** (`projects`):  
  - `id` (PRIMARY KEY)  
  - `nombre`  
  - `descripcion`  
  - `fecha_creacion`  

- **Categorías** (`categories`):  
  - `id` (PRIMARY KEY)  
  - `nombre` (ej. "Materiales", "Comida", "Alojamiento", etc.)

- **Recibos** (`receipts`):  
  - `id` (PRIMARY KEY)  
  - `monto`  
  - `fecha`  
  - `comercio`  
  - `imagenUri` (ruta local o URL en caso de sincronización con un almacenamiento remoto)  
  - `estado` (ENUM: "pendiente", "aprobado", "rechazado")  
  - `motivo_rechazo` (opcional)  
  - `usuario_id` (FOREIGN KEY → `users.id`)  
  - `proyecto_id` (FOREIGN KEY → `projects.id`)  
  - `categoria_id` (FOREIGN KEY → `categories.id`)  

- **Notas/Comentarios** (`comments`):  
  - `id` (PRIMARY KEY)  
  - `texto`  
  - `fecha`  
  - `recibo_id` (FOREIGN KEY → `receipts.id`)  
  - `usuario_id` (FOREIGN KEY → `users.id`)  

Este diseño se puede adaptar o expandir según evolucionen los requerimientos. Al tratarse de SQLite, las migraciones y la estructura deben gestionarse desde el cliente (la app) o a través de un servicio de actualización si existe backend adicional.

---

## 5. Diseño UI/UX
- **Carga de recibos intuitiva:** Botón flotante "+" con ícono de cámara.  
- **Vista de recibos:** Uso de tarjetas (cards) o cuadrículas (grids) para presentar el `thumbnail`, la fecha, el monto, el estado, etc.  
- **Filtros rápidos:** Tabs o menús desplegables para cambiar de proyecto y ver los recibos asociados.  
- **Modo oscuro:** Implementación de una interfaz que soporte el **dark mode**.  
- **Paleta de colores predominante:** Tonalidades azules  
  - `#002F36`, `#005D9F`, `#00A0A0`, `#0000FF`, `#00CFFF`, `#0096D2`

---

## 6. Requisitos Técnicos y Funcionales
1. **OCR preciso**: ✅ Implementado con `react-native-text-recognition` y validación manual mediante `OCRValidationView`.  
2. **Almacenamiento de imágenes**: Se manejan a nivel local (almacenamiento del dispositivo) y, opcionalmente, sincronización con un servidor o servicio de almacenamiento en la nube (p.ej., AWS S3, Firebase Storage, etc.).  
3. **Gestión de estados**: Uso de una tabla `receipts` con un campo ENUM para los estados (pendiente, aprobado, rechazado).  
4. **Notificaciones en tiempo real**: 🟡 En progreso - Integración con Firebase.  
5. **Sincronización offline-first**: 🟡 En progreso - Configurado Redux Offline, se trabaja en la lógica de sincronización con el servidor (cuando aplique).  
6. **Reportes exportables**: 🟡 En progreso - Desarrollo de vistas e integración PDF/Excel.  
7. **Seguridad y autenticación**:  
   - Se puede integrar la autenticación con Firebase Auth, JSON Web Tokens (JWT) u otro método centralizado.  
   - En la base de datos local (SQLite), se manejan únicamente los registros y roles necesarios.

---

## 7. Entregables
- **Código fuente** estructurado en un repositorio (GitHub o GitLab) con README detallado.  
- **Demo funcional**: APK o build para probar en dispositivos móviles.  
- **Base de datos** configurada en SQLite con scripts/migrations para su estructura.  
- **Wireframes o mockups** iniciales (opcional pero recomendado para alineación de diseño).

---

## 8. Cronograma y Metodología
### Estado Actual de Implementación

#### Completado
- **Estructura Base de Datos (SQLite)**  
  - Diseño de tablas y relaciones (usuarios, proyectos, categorías, recibos, comentarios).  
  - Creación de script de inicialización y manejo de migraciones básicas en la app.  
- **Autenticación**  
  - Integración pendiente de definir (Firebase Auth o JWT), pero la capa de roles (ADMIN, TRABAJADOR) ya contemplada en la tabla `users`.  
- **OCR y Validación**  
  - Integración de `react-native-text-recognition`  
  - Componente `OCRValidationView` para verificación de datos  
  - Interfaz de usuario para corrección manual  
- **Estructura del Proyecto**  
  - Configuración de TypeScript  
  - Sistema de navegación implementado (React Navigation)  
  - Setup de pruebas con Jest  

#### En Progreso
- Implementación de la sincronización offline (Redux Offline + SQLite)  
- Integración de notificaciones push con Firebase  
- Desarrollo de vistas de reportes (PDF/Excel)  
- Implementación de la carga masiva de recibos  

*(Las fechas concretas se ajustarán en base al alcance definitivo y los recursos disponibles.)*

---

## 9. Criterios de Éxito
1. **Funcionalidad completa**: Carga de recibos, OCR, estados, filtrado y reportes.  
2. **UI/UX intuitiva**: Asegurar una experiencia fluida y coherente.  
3. **Rendimiento y sincronización offline**: Permitir uso estable sin conexión y sincronizar datos cuando sea necesario.  
4. **Seguridad y autenticación**: Protección de datos y acceso controlado basado en roles.  
5. **Calidad del OCR**: Extracción de datos con alta precisión y mecanismo de corrección simple.

---

### Conclusión
Este proyecto se enfoca en ofrecer una **solución integral** para la gestión de gastos empresariales, aprovechando **React Native** para el desarrollo móvil, **SQLite** para la base de datos local (y eventual sincronización con un servidor) y **OCR** para automatizar la captura de datos de los recibos. Se busca combinar facilidad de uso, robustez en la gestión offline y flexibilidad para evolucionar el sistema según crezcan las necesidades de la empresa.