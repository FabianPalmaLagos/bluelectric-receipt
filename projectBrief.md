**Project Brief: Aplicación Móvil de Gestión de Gastos con React Native y Supabase**

---

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
- **Backend & Base de datos:** Supabase (incluye Supabase Auth para la autenticación)  
- **Notificaciones push:** Firebase Cloud Messaging  
- **Gestión de estado y persistencia offline:** Redux Offline  
- **OCR:** Integración con librerías compatibles (p. ej., `react-native-text-recognition`, `Tesseract.js`)

---

## 4. Base de Datos

### 4.1 Supabase
- **Project ID**: `izcuyqehwvnstcaqfmod`  
- **DB Password**: `sibqon-6cugda-zeJwan`  
- **Project URL**: https://izcuyqehwvnstcaqfmod.supabase.co
- **Anon Public Key**:  
  ```
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Y3V5cWVod3Zuc3RjYXFmbW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4ODkwNzksImV4cCI6MjA1NjQ2NTA3OX0.ivhliX3AysO8ZmbBU6fvYa-yH5OSD-FX4eGB76bwZPE
  ```  
- **JWT Token**:  
  ```
  0VdWYhR4JVsAAU5r5OKksF1hy4zT4/pJnUMTvFRZZzfrImI1GnIWqfsk/1tZSVntAkxCyFHQcEXfrNMeQ8uqYA==
  ```

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
1. **OCR preciso**: Extraer la información clave de los recibos e incluir correcciones manuales.  
2. **Almacenamiento de imágenes**: Guardar recibos en Supabase Storage para una gestión centralizada y segura.  
3. **Gestión de estados**: Controlar cambios de estado (Aceptado, Pendiente, Rechazado) y motivar el rechazo de forma clara.  
4. **Notificaciones en tiempo real**: Avisar a los trabajadores cuando se solicita información adicional o se cambia el estado de un recibo.  
5. **Sincronización offline-first**: Reducir pérdida de datos y mejorar la usabilidad en áreas con conexión inestable.  
6. **Reportes exportables**: Permitir la exportación a PDF o Excel, con selección de rangos de fecha (último mes, últimos 3 meses, etc.).  
7. **Seguridad y autenticación**: Usar Supabase Auth para proteger los datos y garantizar un control de acceso adecuado.

---

## 7. Entregables
- **Código fuente** estructurado en un repositorio (GitHub o GitLab) con README detallado.  
- **Demo funcional**: APK o build para probar en dispositivos móviles.  
- **Base de datos configurada** en Supabase, con documentación del esquema y endpoints.  
- **Wireframes o mockups** iniciales (opcional pero recomendado para alineación de diseño).

---

## 8. Cronograma y Metodología
- **Fase de Análisis y Diseño**  
  - Revisión de requerimientos  
  - Definición de la arquitectura  
  - Creación de wireframes y mockups  
- **Fase de Desarrollo**  
  - Configuración de Supabase y Firebase Cloud Messaging  
  - Implementación del frontend en React Native  
  - Integración del OCR, carga de imágenes y notificaciones push  
  - Pruebas unitarias y ajuste de funcionalidades  
- **Fase de Testing**  
  - Pruebas integrales para validación de carga, edición y exportación de recibos  
  - Optimización de la experiencia offline  
- **Entrega y Documentación**  
  - Release de la APK  
  - Documentación final y manual de uso  

*(Las fechas concretas se ajustarán en base al alcance definitivo y los recursos disponibles.)*

---

## 9. Criterios de Éxito
1. **Funcionalidad completa**: Carga de recibos, OCR, estados, filtrado y reportes.  
2. **UI/UX intuitiva**: Asegurar una experiencia fluida y coherente.  
3. **Rendimiento y sincronización offline**: Permitir uso estable sin conexión.  
4. **Seguridad y autenticación**: Protección de datos, acceso controlado y notificaciones confiables.  
5. **Calidad del OCR**: Extracción de datos con tasa de acierto alta y sencilla corrección manual.

---

### Conclusión
Este proyecto busca ofrecer una **solución integral** para la gestión de gastos empresariales, facilitando la digitalización y optimización de procesos. Al combinar **React Native**, **Supabase** y **OCR**, se pretende crear una aplicación escalable, segura y con un enfoque centrado en la experiencia de usuario tanto para administradores como para trabajadores.