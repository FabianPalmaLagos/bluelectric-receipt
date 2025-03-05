import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '../../types';
import { db, numberToStringId } from '../../utils/db/exports';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Función auxiliar para obtener usuario por email
const getUserByEmail = async (email: string): Promise<any> => {
  try {
    // Asegurar que la búsqueda no sea sensible a mayúsculas/minúsculas
    const users = await db.query(
      'SELECT * FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1',
      [email]
    );
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('Error al buscar usuario por email:', error);
    return null;
  }
};

// Thunks para operaciones asíncronas
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await getUserByEmail(email);
      
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // En una implementación real, aquí verificarías el hash de la contraseña
      // Por ahora, solo verificamos que el email exista
      
      const userData: User = {
        id: numberToStringId(user.id),
        email: user.email,
        role: user.rol as UserRole,
        firstName: user.nombre.split(' ')[0],
        lastName: user.nombre.split(' ').slice(1).join(' '),
        createdAt: user.fecha_alta,
      };

      return userData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      email,
      password,
      firstName,
      lastName,
      role,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role: UserRole;
    },
    { rejectWithValue }
  ) => {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Convertir el rol al formato esperado por la base de datos (según la restricción CHECK)
      const dbRole = role === UserRole.ADMIN ? 'ADMINISTRADOR' : 'TRABAJADOR';

      // Crear nuevo usuario
      const userData = {
        nombre: `${firstName} ${lastName}`,
        email,
        rol: dbRole, // Usar el rol convertido
        fecha_alta: new Date().toISOString(),
      };

      try {
        const userId = await db.insert('users', userData);

        const newUser: User = {
          id: numberToStringId(userId),
          email,
          role,
          firstName,
          lastName,
          createdAt: userData.fecha_alta,
        };

        return newUser;
      } catch (dbError: any) {
        // Manejar específicamente el error de email duplicado
        if (dbError.message && dbError.message.includes('UNIQUE constraint failed: users.email')) {
          throw new Error('El email ya está registrado. Por favor utiliza otro correo electrónico.');
        }
        // Otros errores de base de datos
        throw dbError;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    // En la implementación local, solo necesitamos limpiar el estado
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    // En una implementación real, aquí verificarías una sesión local almacenada
    // Por ahora, retornamos null para indicar que no hay sesión activa
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User | null>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;