import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabase';
import { Project, Category } from '../../types';

interface ProjectsState {
  projects: Project[];
  categories: Category[];
  currentProject: Project | null;
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  categories: [],
  currentProject: null,
  currentCategory: null,
  loading: false,
  error: null,
};

// Thunks para operaciones asíncronas
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transformar los datos de snake_case a camelCase
    return data.map((project: any) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    })) as Project[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('id', projectId).single();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Project;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ name, description }])
        .select();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
      } as Project;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (
    { id, name, description }: { id: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ name, description })
        .eq('id', id)
        .select();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data[0].id,
        name: data[0].name,
        description: data[0].description,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
      } as Project;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectId);

      if (error) throw error;

      return projectId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoriesByProject = createAsyncThunk(
  'projects/fetchCategoriesByProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('project_id', projectId);

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return data.map((category: any) => ({
        id: category.id,
        name: category.name,
        projectId: category.project_id,
      })) as Category[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'projects/createCategory',
  async (
    { name, projectId }: { name: string; projectId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name, project_id: projectId }])
        .select();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data[0].id,
        name: data[0].name,
        projectId: data[0].project_id,
      } as Category;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'projects/updateCategory',
  async (
    { id, name }: { id: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({ name })
        .eq('id', id)
        .select();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data[0].id,
        name: data[0].name,
        projectId: data[0].project_id,
      } as Category;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'projects/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from('categories').delete().eq('id', categoryId);

      if (error) throw error;

      return categoryId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Project By Id
    builder.addCase(fetchProjectById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.currentProject = action.payload;
    });
    builder.addCase(fetchProjectById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Project
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.projects = [action.payload, ...state.projects];
      state.currentProject = action.payload;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Project
    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
      state.loading = false;
      state.projects = state.projects.map(project =>
        project.id === action.payload.id ? action.payload : project
      );
      state.currentProject = action.payload;
    });
    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Project
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.projects = state.projects.filter(project => project.id !== action.payload);
      if (state.currentProject && state.currentProject.id === action.payload) {
        state.currentProject = null;
      }
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Categories By Project
    builder.addCase(fetchCategoriesByProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoriesByProject.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesByProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Category
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
      state.loading = false;
      state.categories = [action.payload, ...state.categories];
      state.currentCategory = action.payload;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Category
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
      state.loading = false;
      state.categories = state.categories.map(category =>
        category.id === action.payload.id ? action.payload : category
      );
      state.currentCategory = action.payload;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Category
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.categories = state.categories.filter(category => category.id !== action.payload);
      if (state.currentCategory && state.currentCategory.id === action.payload) {
        state.currentCategory = null;
      }
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setCurrentProject, setCurrentCategory } = projectsSlice.actions;
export default projectsSlice.reducer;