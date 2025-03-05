import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project, Category } from '../../types';
import { db, numberToStringId, stringToNumberId } from '../../utils/db/exports';

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
    const data = await db.query(
      'SELECT * FROM projects ORDER BY created_at DESC',
      []
    );

    // Transformar los datos
    return data.map((project: any) => ({
      id: numberToStringId(project.id),
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
      const data = await db.query(
        'SELECT * FROM projects WHERE id = ? LIMIT 1',
        [stringToNumberId(projectId)]
      );

      if (!data || data.length === 0) {
        throw new Error('Proyecto no encontrado');
      }

      // Transformar los datos
      return {
        id: numberToStringId(data[0].id),
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

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (
    { name, description }: { name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const now = new Date().toISOString();
      const projectData = {
        name,
        description,
        created_at: now,
        updated_at: now
      };

      const projectId = await db.insert('projects', projectData);

      // Transformar los datos
      return {
        id: numberToStringId(projectId),
        name,
        description,
        createdAt: now,
        updatedAt: now,
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
      const now = new Date().toISOString();
      const updateData = {
        name,
        description,
        updated_at: now
      };

      await db.update(
        'projects',
        updateData,
        { id: stringToNumberId(id) }
      );

      // Obtener el proyecto actualizado
      const updated = await db.query(
        'SELECT * FROM projects WHERE id = ? LIMIT 1',
        [stringToNumberId(id)]
      );

      if (!updated || updated.length === 0) {
        throw new Error('No se pudo actualizar el proyecto');
      }

      // Transformar los datos
      return {
        id: numberToStringId(updated[0].id),
        name: updated[0].name,
        description: updated[0].description,
        createdAt: updated[0].created_at,
        updatedAt: updated[0].updated_at,
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
      await db.delete(
        'projects',
        { id: stringToNumberId(projectId) }
      );

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
      const data = await db.query(
        'SELECT * FROM categories WHERE project_id = ?',
        [stringToNumberId(projectId)]
      );

      // Transformar los datos
      return data.map((category: any) => ({
        id: numberToStringId(category.id),
        name: category.name,
        projectId: numberToStringId(category.project_id),
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
      const categoryData = {
        name,
        project_id: stringToNumberId(projectId)
      };

      const categoryId = await db.insert('categories', categoryData);

      // Transformar los datos
      return {
        id: numberToStringId(categoryId),
        name,
        projectId,
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
      await db.update(
        'categories',
        { name },
        { id: stringToNumberId(id) }
      );

      // Obtener la categoría actualizada
      const updated = await db.query(
        'SELECT * FROM categories WHERE id = ? LIMIT 1',
        [stringToNumberId(id)]
      );

      if (!updated || updated.length === 0) {
        throw new Error('No se pudo actualizar la categoría');
      }

      // Transformar los datos
      return {
        id: numberToStringId(updated[0].id),
        name: updated[0].name,
        projectId: numberToStringId(updated[0].project_id),
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
      await db.delete(
        'categories',
        { id: stringToNumberId(categoryId) }
      );

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