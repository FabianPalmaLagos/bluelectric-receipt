import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabase';
import { User, UserRole } from '../../types';

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

// Thunks para operaciones asíncronas
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Obtener datos adicionales del usuario desde la tabla de perfiles
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single();

      if (profileError) throw profileError;

      return {
        id: data.user?.id,
        email: data.user?.email,
        role: profileData.role as UserRole,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        createdAt: data.user?.created_at,
      } as User;
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
      // Registrar usuario en Supabase Auth con opciones específicas para móvil
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // URL de redirección modificada para mejor compatibilidad con Android
          emailRedirectTo: 'https://izcuyqehwvnstcaqfmod.supabase.co/auth/v1/verify?redirect_to=bluelectric://login',
          data: {
            first_name: firstName,
            last_name: lastName,
            role: role,
          }
        }
      });

      if (error) throw error;

      try {
        // Crear perfil de usuario en la tabla de perfiles
        // Usamos un bloque try/catch específico para que si falla la creación del perfil,
        // al menos el usuario pueda registrarse
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user?.id,
            first_name: firstName,
            last_name: lastName,
            role,
          },
        ]);

        if (profileError) {
          console.error('Error al crear perfil:', profileError.message);
          // Continuamos el flujo a pesar del error en la creación del perfil
        }
      } catch (profileError) {
        console.error('Error al crear perfil:', profileError);
        // Continuamos el flujo a pesar del error en la creación del perfil
      }

      return {
        id: data.user?.id,
        email: data.user?.email,
        role,
        firstName,
        lastName,
        createdAt: data.user?.created_at,
      } as User;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return null;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!data.session) return null;

    // Obtener datos adicionales del usuario desde la tabla de perfiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.session.user.id)
      .single();

    if (profileError) throw profileError;

    return {
      id: data.session.user.id,
      email: data.session.user.email,
      role: profileData.role as UserRole,
      firstName: profileData.first_name,
      lastName: profileData.last_name,
      createdAt: data.session.user.created_at,
    } as User;
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
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      // No establecemos el usuario ni isAuthenticated aquí porque necesitamos confirmación por email
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