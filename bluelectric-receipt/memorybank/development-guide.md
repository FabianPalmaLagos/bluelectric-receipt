# Guía de Desarrollo

Esta guía proporciona instrucciones detalladas para configurar el entorno de desarrollo, convenciones de código y flujo de trabajo para contribuir al proyecto BlueElectric Receipt.

## Configuración del Entorno de Desarrollo

### Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior) o yarn (v1.22.0 o superior)
- Expo CLI (`npm install -g expo-cli`)
- Git
- Editor de código (recomendado: Visual Studio Code)

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/bluelectric-receipt.git
cd bluelectric-receipt
```

### Instalar Dependencias

```bash
npm install
# o si prefieres yarn
yarn install
```

### Configuración de Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Para obtener estas variables:
   - Crea un proyecto en [Supabase](https://supabase.io)
   - En la sección "Settings > API", encontrarás la URL y la Anon Key

### Configuración de Supabase

1. Crea las tablas necesarias en Supabase:

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

2. Configura las políticas RLS (Row Level Security):

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all profiles" 
  ON profiles FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Projects policies
CREATE POLICY "Anyone can view active projects" 
  ON projects FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admin can manage projects" 
  ON projects FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Receipts policies
CREATE POLICY "Users can view own receipts" 
  ON receipts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own receipts" 
  ON receipts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own receipts with pending status" 
  ON receipts FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admin can view all receipts" 
  ON receipts FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admin can update receipt status" 
  ON receipts FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Comments policies
CREATE POLICY "Anyone can view comments" 
  ON comments FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert comments" 
  ON comments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" 
  ON comments FOR UPDATE 
  USING (auth.uid() = user_id);
```

### Configuración del Storage en Supabase

1. Crear un bucket para las imágenes de recibos:
   - Nombre: `receipts`
   - Acceso público: desactivado
   - Políticas RLS: activadas

2. Configurar políticas para el bucket:

```sql
-- Allow users to upload their own receipts
CREATE POLICY "Users can upload own receipts" 
  ON storage.objects FOR INSERT 
  WITH CHECK (
    auth.uid() = (storage.foldername())[1]::uuid AND
    (storage.filename())[2] = 'receipts'
  );

-- Users can view their own receipts
CREATE POLICY "Users can view own receipts" 
  ON storage.objects FOR SELECT 
  USING (
    auth.uid() = (storage.foldername())[1]::uuid AND
    (storage.filename())[2] = 'receipts'
  );

-- Admin can view all receipts
CREATE POLICY "Admin can view all receipts" 
  ON storage.objects FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    ) AND
    (storage.filename())[2] = 'receipts'
  );
```

### Ejecución del Proyecto

```bash
npm start
# o
expo start
```

Esto iniciará el servidor de desarrollo de Expo. Puedes ejecutar la aplicación en:
- Emulador iOS/Android
- Dispositivo físico utilizando la aplicación Expo Go
- Navegador web (funcionalidad limitada)

## Convenciones de Código

### Estructura de Archivos

- Cada componente debe tener su propio directorio dentro de `src/components`
- Los componentes complejos deben dividirse en subcomponentes
- Cada pantalla debe tener su propio archivo dentro de `src/screens`

### Convenciones de Nomenclatura

- **Archivos y Carpetas**: Utilizar PascalCase para componentes y pantallas, kebab-case para utilidades
- **Componentes React**: PascalCase (ej. `ReceiptCard.tsx`)
- **Hooks**: Prefijo "use" + camelCase (ej. `useAuth.ts`)
- **Tipos e Interfaces**: PascalCase (ej. `Receipt.ts`)
- **Constantes**: UPPER_SNAKE_CASE (ej. `API_ENDPOINT`)
- **Funciones y Variables**: camelCase (ej. `fetchReceipts`)

### Estilo de Código

Utilizamos ESLint y Prettier para mantener un estilo de código consistente:

```bash
# Verificar estilo
npm run lint

# Corregir automáticamente problemas de estilo
npm run lint:fix
```

Configuración recomendada para VSCode:
- Instalar extensiones ESLint y Prettier
- Configurar "Format on Save"
- Añadir la siguiente configuración en `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

### Convenciones TypeScript

- Usar tipado estricto en todas partes
- Evitar `any` cuando sea posible
- Definir interfaces o tipos para todas las estructuras de datos
- Exportar tipos e interfaces para reutilización

```typescript
// Ejemplo de buena práctica
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
```

## Flujo de Trabajo Git

### Ramas

- `main`: Código de producción
- `develop`: Rama de desarrollo principal
- `feature/<nombre>`: Nuevas funcionalidades
- `bugfix/<nombre>`: Correcciones de errores
- `release/<version>`: Preparación para lanzamiento

### Proceso de Pull Request

1. Crea una rama desde `develop` para tu funcionalidad o corrección
2. Desarrolla y prueba tu código
3. Asegúrate de que pase lint y tests
4. Crea un Pull Request a `develop`
5. Solicita revisión de código
6. Después de la aprobación, realiza merge

### Convenciones de Commits

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) para el formato de los mensajes:

```
<tipo>(alcance opcional): <descripción>

[cuerpo opcional]

[pie opcional]
```

Tipos principales:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de errores
- `docs`: Cambios en documentación
- `style`: Cambios de formato, espaciado, etc.
- `refactor`: Refactorización de código
- `test`: Añadir o corregir tests
- `chore`: Tareas de mantenimiento

Ejemplo:
```
feat(auth): implementar pantalla de registro

- Añadir formulario con validación
- Integrar con API de Supabase
- Añadir navegación a pantalla de login

Closes #123
```

## Pruebas

### Pruebas Unitarias

Utilizamos Jest para pruebas unitarias:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con coverage
npm test -- --coverage

# Ejecutar pruebas en modo watch
npm test -- --watch
```

Estructura recomendada para pruebas:
```
__tests__/
└── components/
    └── ReceiptCard.test.tsx
```

### Pruebas de Componentes

Utilizamos React Testing Library para pruebas de componentes:

```jsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import ReceiptCard from '../components/ReceiptCard';

describe('ReceiptCard', () => {
  it('renders correctly', () => {
    const receipt = { /* ... */ };
    render(<ReceiptCard receipt={receipt} />);
    
    expect(screen.getByText(receipt.merchant)).toBeTruthy();
    expect(screen.getByText(`$${receipt.amount.toFixed(2)}`)).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const receipt = { /* ... */ };
    const onPress = jest.fn();
    render(<ReceiptCard receipt={receipt} onPress={onPress} />);
    
    fireEvent.press(screen.getByTestId('receipt-card'));
    
    expect(onPress).toHaveBeenCalledWith(receipt.id);
  });
});
```

## Despliegue

### Generación de APK/IPA

```bash
# Generar APK para Android
expo build:android

# Generar IPA para iOS
expo build:ios
```

### Publicación en Tiendas

1. **Google Play Store**:
   - Generar APK firmado
   - Crear cuenta de desarrollador en Google Play Console
   - Crear nueva aplicación y subir APK
   - Completar información de la ficha
   - Publicar en testing o producción

2. **Apple App Store**:
   - Generar IPA firmado
   - Crear cuenta en Apple Developer Program
   - Crear nueva aplicación en App Store Connect
   - Subir build a través de Xcode o Transporter
   - Completar información de la ficha
   - Enviar para revisión

## Solución de Problemas Comunes

### Problemas de Dependencias

Si encuentras problemas con las dependencias:

```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules
npm install
```

### Problemas con Expo

```bash
# Reiniciar el servidor de desarrollo
expo start -c

# Actualizar Expo CLI
npm install -g expo-cli@latest
```

### Problemas con Supabase

1. Verifica las variables de entorno
2. Comprueba las políticas RLS
3. Revisa los logs en el panel de Supabase
4. Verifica las cuotas y límites de tu plan

## Recursos Adicionales

- [Documentación de React Native](https://reactnative.dev/docs/getting-started)
- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de Supabase](https://supabase.io/docs)
- [Documentación de Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [Documentación de React Navigation](https://reactnavigation.org/docs/getting-started) 