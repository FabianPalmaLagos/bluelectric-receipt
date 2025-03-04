# API y Modelos de Datos

Este documento detalla los modelos de datos utilizados en BlueElectric Receipt y las operaciones disponibles a través de la API de Supabase.

## Modelos de Datos

### Usuario (User)

Representa a un usuario de la aplicación. Extiende el modelo de autenticación incorporado en Supabase.

```typescript
interface User {
  id: string;           // UUID único del usuario (generado por Supabase Auth)
  email: string;        // Correo electrónico del usuario
  firstName: string;    // Nombre del usuario
  lastName: string;     // Apellido del usuario
  role: UserRole;       // Rol del usuario (admin o user)
  createdAt: string;    // Fecha de creación (ISO string)
  updatedAt: string;    // Fecha de última actualización (ISO string)
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
```

**Tabla en Supabase**: `profiles` (extiende `auth.users`)

### Recibo (Receipt)

Representa un recibo de gasto registrado por un usuario.

```typescript
interface Receipt {
  id: string;                 // UUID único del recibo
  userId: string;             // ID del usuario que creó el recibo
  projectId: string;          // ID del proyecto asociado
  merchant: string;           // Nombre del comercio
  amount: number;             // Monto del recibo
  date: string;               // Fecha del recibo (ISO string)
  description?: string;       // Descripción opcional
  imageUrl: string;           // URL de la imagen del recibo
  status: ReceiptStatus;      // Estado del recibo
  rejectionReason?: string;   // Motivo de rechazo (si aplica)
  createdAt: string;          // Fecha de creación (ISO string)
  updatedAt: string;          // Fecha de última actualización (ISO string)
  comments?: Comment[];       // Comentarios asociados (opcional)
}

enum ReceiptStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}
```

**Tabla en Supabase**: `receipts`

### Proyecto (Project)

Representa un proyecto al que se pueden asociar recibos.

```typescript
interface Project {
  id: string;                 // UUID único del proyecto
  name: string;               // Nombre del proyecto
  description?: string;       // Descripción opcional
  isActive: boolean;          // Estado del proyecto (activo/inactivo)
  createdAt: string;          // Fecha de creación (ISO string)
  updatedAt: string;          // Fecha de última actualización (ISO string)
  totalExpenses?: number;     // Total de gastos (calculado)
  pendingExpenses?: number;   // Total de gastos pendientes (calculado)
  approvedExpenses?: number;  // Total de gastos aprobados (calculado)
  rejectedExpenses?: number;  // Total de gastos rechazados (calculado)
}
```

**Tabla en Supabase**: `projects`

### Comentario (Comment)

Representa un comentario asociado a un recibo.

```typescript
interface Comment {
  id: string;           // UUID único del comentario
  receiptId: string;    // ID del recibo asociado
  userId: string;       // ID del usuario que creó el comentario
  text: string;         // Texto del comentario
  timestamp: string;    // Fecha y hora del comentario (ISO string)
}
```

**Tabla en Supabase**: `comments`

## Operaciones de API

BlueElectric Receipt utiliza Supabase como backend. A continuación, se detallan las operaciones disponibles organizadas por entidad.

### Autenticación

#### Iniciar Sesión

```typescript
/**
 * Inicia sesión de un usuario con email y contraseña
 * @param email Email del usuario
 * @param password Contraseña del usuario
 * @returns Usuario autenticado y token de sesión
 */
async function signIn(email: string, password: string): Promise<{
  user: User;
  session: Session;
}>;
```

#### Registro de Usuario

```typescript
/**
 * Registra un nuevo usuario
 * @param email Email del usuario
 * @param password Contraseña del usuario
 * @param firstName Nombre del usuario
 * @param lastName Apellido del usuario
 * @param role Rol del usuario (por defecto 'user')
 * @returns Usuario creado y token de sesión
 */
async function signUp(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: UserRole = UserRole.USER
): Promise<{
  user: User;
  session: Session;
}>;
```

#### Cerrar Sesión

```typescript
/**
 * Cierra la sesión del usuario actual
 * @returns Void
 */
async function signOut(): Promise<void>;
```

#### Recuperar Contraseña

```typescript
/**
 * Envía un email de recuperación de contraseña
 * @param email Email del usuario
 * @returns Void
 */
async function resetPassword(email: string): Promise<void>;
```

#### Actualizar Perfil

```typescript
/**
 * Actualiza el perfil del usuario
 * @param userId ID del usuario
 * @param userData Datos a actualizar
 * @returns Usuario actualizado
 */
async function updateProfile(
  userId: string,
  userData: Partial<User>
): Promise<User>;
```

### Recibos

#### Obtener Todos los Recibos

```typescript
/**
 * Obtiene todos los recibos del usuario actual
 * @returns Lista de recibos
 */
async function fetchReceipts(): Promise<Receipt[]>;
```

#### Obtener Recibos por Proyecto

```typescript
/**
 * Obtiene todos los recibos asociados a un proyecto
 * @param projectId ID del proyecto
 * @returns Lista de recibos del proyecto
 */
async function fetchReceiptsByProject(projectId: string): Promise<Receipt[]>;
```

#### Obtener Recibo por ID

```typescript
/**
 * Obtiene un recibo específico por su ID
 * @param receiptId ID del recibo
 * @returns Recibo encontrado
 */
async function fetchReceiptById(receiptId: string): Promise<Receipt>;
```

#### Crear Recibo

```typescript
/**
 * Crea un nuevo recibo
 * @param receiptData Datos del recibo
 * @returns Recibo creado
 */
async function addReceipt(receiptData: {
  merchant: string;
  amount: number;
  date: string;
  description?: string;
  projectId: string;
  imageUri: string;
  userId: string;
}): Promise<Receipt>;
```

#### Actualizar Recibo

```typescript
/**
 * Actualiza un recibo existente
 * @param receiptData Datos a actualizar
 * @returns Recibo actualizado
 */
async function updateReceipt(
  receiptData: Partial<Receipt> & { id: string }
): Promise<Receipt>;
```

#### Cambiar Estado de Recibo

```typescript
/**
 * Actualiza el estado de un recibo
 * @param receiptId ID del recibo
 * @param status Nuevo estado
 * @param rejectionReason Motivo de rechazo (opcional)
 * @returns Recibo actualizado
 */
async function updateReceiptStatus({
  receiptId,
  status,
  rejectionReason
}: {
  receiptId: string;
  status: ReceiptStatus;
  rejectionReason?: string;
}): Promise<Receipt>;
```

#### Eliminar Recibo

```typescript
/**
 * Elimina un recibo
 * @param receiptId ID del recibo
 * @returns Void
 */
async function deleteReceipt(receiptId: string): Promise<void>;
```

### Comentarios

#### Obtener Comentarios de un Recibo

```typescript
/**
 * Obtiene todos los comentarios de un recibo
 * @param receiptId ID del recibo
 * @returns Lista de comentarios
 */
async function fetchCommentsByReceipt(receiptId: string): Promise<Comment[]>;
```

#### Añadir Comentario

```typescript
/**
 * Añade un comentario a un recibo
 * @param commentData Datos del comentario
 * @returns Comentario creado
 */
async function addComment(commentData: {
  receiptId: string;
  userId: string;
  text: string;
  timestamp: string;
}): Promise<Comment>;
```

#### Eliminar Comentario

```typescript
/**
 * Elimina un comentario
 * @param commentId ID del comentario
 * @returns Void
 */
async function deleteComment(commentId: string): Promise<void>;
```

### Proyectos

#### Obtener Todos los Proyectos

```typescript
/**
 * Obtiene todos los proyectos
 * @returns Lista de proyectos
 */
async function fetchProjects(): Promise<Project[]>;
```

#### Obtener Proyecto por ID

```typescript
/**
 * Obtiene un proyecto específico por su ID
 * @param projectId ID del proyecto
 * @returns Proyecto encontrado
 */
async function fetchProjectById(projectId: string): Promise<Project>;
```

#### Crear Proyecto

```typescript
/**
 * Crea un nuevo proyecto
 * @param projectData Datos del proyecto
 * @returns Proyecto creado
 */
async function addProject(projectData: {
  name: string;
  description?: string;
  isActive: boolean;
}): Promise<Project>;
```

#### Actualizar Proyecto

```typescript
/**
 * Actualiza un proyecto existente
 * @param projectData Datos a actualizar
 * @returns Proyecto actualizado
 */
async function updateProject(
  projectData: Partial<Project> & { id: string }
): Promise<Project>;
```

#### Cambiar Estado de Proyecto

```typescript
/**
 * Actualiza el estado de un proyecto (activo/inactivo)
 * @param projectId ID del proyecto
 * @param isActive Nuevo estado
 * @returns Proyecto actualizado
 */
async function updateProjectStatus({
  projectId,
  isActive
}: {
  projectId: string;
  isActive: boolean;
}): Promise<Project>;
```

### Almacenamiento

#### Subir Imagen de Recibo

```typescript
/**
 * Sube una imagen de recibo al storage
 * @param userId ID del usuario
 * @param imageUri URI local de la imagen
 * @returns URL pública de la imagen
 */
async function uploadReceiptImage(
  userId: string,
  imageUri: string
): Promise<string>;
```

#### Eliminar Imagen de Recibo

```typescript
/**
 * Elimina una imagen de recibo del storage
 * @param imageUrl URL de la imagen
 * @returns Void
 */
async function deleteReceiptImage(imageUrl: string): Promise<void>;
```

## Estructura de la Base de Datos

### Esquema de Tablas

```sql
-- Users (extends built-in auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Receipts
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  project_id UUID NOT NULL REFERENCES projects(id),
  merchant TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  receipt_id UUID NOT NULL REFERENCES receipts(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  text TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Índices

```sql
-- Índices para búsquedas frecuentes
CREATE INDEX receipts_user_id_idx ON receipts(user_id);
CREATE INDEX receipts_project_id_idx ON receipts(project_id);
CREATE INDEX receipts_status_idx ON receipts(status);
CREATE INDEX comments_receipt_id_idx ON comments(receipt_id);
```

### Triggers

```sql
-- Trigger para actualizar el campo updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_projects_modtime
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_receipts_modtime
BEFORE UPDATE ON receipts
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
```

### Vistas

```sql
-- Vista para estadísticas de proyectos
CREATE VIEW project_stats AS
SELECT
  p.id,
  p.name,
  p.is_active,
  COALESCE(SUM(r.amount), 0) AS total_expenses,
  COALESCE(SUM(CASE WHEN r.status = 'pending' THEN r.amount ELSE 0 END), 0) AS pending_expenses,
  COALESCE(SUM(CASE WHEN r.status = 'approved' THEN r.amount ELSE 0 END), 0) AS approved_expenses,
  COALESCE(SUM(CASE WHEN r.status = 'rejected' THEN r.amount ELSE 0 END), 0) AS rejected_expenses,
  COUNT(r.id) AS total_receipts,
  COUNT(CASE WHEN r.status = 'pending' THEN 1 ELSE NULL END) AS pending_receipts,
  COUNT(CASE WHEN r.status = 'approved' THEN 1 ELSE NULL END) AS approved_receipts,
  COUNT(CASE WHEN r.status = 'rejected' THEN 1 ELSE NULL END) AS rejected_receipts
FROM
  projects p
LEFT JOIN
  receipts r ON p.id = r.project_id
GROUP BY
  p.id, p.name, p.is_active;
```

## Políticas de Seguridad (RLS)

Supabase utiliza Row Level Security (RLS) para proteger los datos. A continuación se detallan las políticas implementadas:

### Políticas para Profiles

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles" 
  ON profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));
```

### Políticas para Projects

```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view active projects
CREATE POLICY "Anyone can view active projects" 
  ON projects FOR SELECT 
  USING (is_active = true);

-- Admin can manage projects
CREATE POLICY "Admin can manage projects" 
  ON projects FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));
```

### Políticas para Receipts

```sql
-- Enable RLS
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

-- Users can view own receipts
CREATE POLICY "Users can view own receipts" 
  ON receipts FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert own receipts
CREATE POLICY "Users can insert own receipts" 
  ON receipts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update own receipts with pending status
CREATE POLICY "Users can update own receipts with pending status" 
  ON receipts FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'pending');

-- Admin can view all receipts
CREATE POLICY "Admin can view all receipts" 
  ON receipts FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Admin can update receipt status
CREATE POLICY "Admin can update receipt status" 
  ON receipts FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));
```

### Políticas para Comments

```sql
-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view comments
CREATE POLICY "Anyone can view comments" 
  ON comments FOR SELECT 
  USING (true);

-- Users can insert comments
CREATE POLICY "Users can insert comments" 
  ON comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update own comments
CREATE POLICY "Users can update own comments" 
  ON comments FOR UPDATE 
  USING (auth.uid() = user_id);
```

## Implementación en Redux

Las operaciones de API se implementan mediante Redux Toolkit thunks en los siguientes slices:

### authSlice

```typescript
// Acciones asíncronas
export const signIn = createAsyncThunk('auth/signIn', async (credentials, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
```

### receiptsSlice

```typescript
// Acciones asíncronas
export const fetchReceipts = createAsyncThunk('receipts/fetchReceipts', async (_, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchReceiptsByProject = createAsyncThunk('receipts/fetchReceiptsByProject', async (projectId, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchReceiptById = createAsyncThunk('receipts/fetchReceiptById', async (receiptId, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addReceipt = createAsyncThunk('receipts/addReceipt', async (receiptData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateReceipt = createAsyncThunk('receipts/updateReceipt', async (receiptData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateReceiptStatus = createAsyncThunk('receipts/updateReceiptStatus', async (statusData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteReceipt = createAsyncThunk('receipts/deleteReceipt', async (receiptId, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addComment = createAsyncThunk('receipts/addComment', async (commentData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
```

### projectsSlice

```typescript
// Acciones asíncronas
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (projectId, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addProject = createAsyncThunk('projects/addProject', async (projectData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateProject = createAsyncThunk('projects/updateProject', async (projectData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateProjectStatus = createAsyncThunk('projects/updateProjectStatus', async (statusData, { rejectWithValue }) => {
  try {
    // Implementación
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
```

## Manejo de Errores

Los errores de API se manejan de manera consistente:

1. Todas las operaciones están envueltas en bloques try/catch
2. Los errores se devuelven mediante `rejectWithValue` para ser procesados por los reducers
3. Los mensajes de error se almacenan en el estado para mostrarlos al usuario

```typescript
// Ejemplo de manejo de errores en un slice
const receiptsSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    // Reducers...
  },
  extraReducers: (builder) => {
    builder
      // Otros casos...
      .addCase(fetchReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Más casos...
  },
});
```

## Implementación del Cliente Supabase

El cliente de Supabase se configura en `src/api/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.manifest?.extra?.supabaseUrl || process.env.SUPABASE_URL;
const supabaseAnonKey = Constants.manifest?.extra?.supabaseAnonKey || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
``` 