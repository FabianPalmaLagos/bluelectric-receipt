import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../api/supabase';
import { Receipt, ReceiptStatus } from '../../types';

interface ReceiptsState {
  receipts: Receipt[];
  pendingReceipts: Receipt[]; // Recibos guardados localmente para sincronizar
  currentReceipt: Receipt | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReceiptsState = {
  receipts: [],
  pendingReceipts: [],
  currentReceipt: null,
  loading: false,
  error: null,
};

// Thunks para operaciones asíncronas
export const fetchReceipts = createAsyncThunk(
  'receipts/fetchReceipts',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return data.map((receipt: any) => ({
        id: receipt.id,
        userId: receipt.user_id,
        projectId: receipt.project_id,
        categoryId: receipt.category_id,
        amount: receipt.amount,
        date: receipt.date,
        merchant: receipt.merchant,
        description: receipt.description,
        imageUrl: receipt.image_url,
        status: receipt.status,
        rejectionReason: receipt.rejection_reason,
        createdAt: receipt.created_at,
        updatedAt: receipt.updated_at,
      })) as Receipt[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReceiptsByProject = createAsyncThunk(
  'receipts/fetchReceiptsByProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return data.map((receipt: any) => ({
        id: receipt.id,
        userId: receipt.user_id,
        projectId: receipt.project_id,
        categoryId: receipt.category_id,
        amount: receipt.amount,
        date: receipt.date,
        merchant: receipt.merchant,
        description: receipt.description,
        imageUrl: receipt.image_url,
        status: receipt.status,
        rejectionReason: receipt.rejection_reason,
        createdAt: receipt.created_at,
        updatedAt: receipt.updated_at,
      })) as Receipt[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReceiptById = createAsyncThunk(
  'receipts/fetchReceiptById',
  async (receiptId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .select('*')
        .eq('id', receiptId)
        .single();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data.id,
        userId: data.user_id,
        projectId: data.project_id,
        categoryId: data.category_id,
        amount: data.amount,
        date: data.date,
        merchant: data.merchant,
        description: data.description,
        imageUrl: data.image_url,
        status: data.status,
        rejectionReason: data.rejection_reason,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Receipt;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción para crear un recibo adaptada a redux-offline
export const createReceipt = (receipt: Omit<Receipt, 'id'>) => ({
  type: 'receipts/createReceipt',
  payload: receipt,
  meta: {
    offline: {
      // Lo que se hace cuando estamos desconectados
      effect: {
        url: `${process.env.SUPABASE_URL}/rest/v1/receipts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'apikey': process.env.SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          user_id: receipt.userId,
          project_id: receipt.projectId,
          category_id: receipt.categoryId,
          amount: receipt.amount,
          date: receipt.date,
          merchant: receipt.merchant,
          description: receipt.description,
          image_url: receipt.imageUrl,
          status: receipt.status,
          rejection_reason: receipt.rejectionReason || null,
        }),
      },
      // Lo que se hace cuando la operación online tiene éxito
      commit: { type: 'receipts/createReceiptSuccess', meta: { receipt } },
      // Lo que se hace cuando la operación online falla
      rollback: { type: 'receipts/createReceiptFailure', meta: { receipt } },
    },
  },
});

// Acción para añadir un recibo adaptada a redux-offline
export const addReceipt = (receiptData: any) => ({
  type: 'receipts/addReceipt',
  payload: {
    ...receiptData,
    tempId: `temp-${Date.now()}`, // Generamos un ID temporal
    isOffline: false, // Por defecto no está en modo offline
    status: 'pending', // Estado inicial
  },
  meta: {
    offline: {
      // Lo que se hace cuando estamos desconectados
      effect: {
        url: `${process.env.SUPABASE_URL}/rest/v1/receipts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'apikey': process.env.SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          user_id: receiptData.userId,
          project_id: receiptData.projectId,
          category_id: receiptData.categoryId || null,
          amount: receiptData.amount,
          date: receiptData.date,
          merchant: receiptData.merchant,
          description: receiptData.description,
          image_url: receiptData.imageUri || null,
          status: 'pending',
        }),
      },
      // Lo que se hace cuando la operación online tiene éxito
      commit: { type: 'receipts/addReceiptSuccess', meta: { receiptData } },
      // Lo que se hace cuando la operación online falla
      rollback: { type: 'receipts/addReceiptFailure', meta: { receiptData } },
    },
  },
});

export const updateReceipt = createAsyncThunk(
  'receipts/updateReceipt',
  async (receipt: Receipt, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .update({
          project_id: receipt.projectId,
          category_id: receipt.categoryId,
          amount: receipt.amount,
          date: receipt.date,
          merchant: receipt.merchant,
          description: receipt.description,
          image_url: receipt.imageUrl,
          status: receipt.status,
          rejection_reason: receipt.rejectionReason,
        })
        .eq('id', receipt.id)
        .select();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data[0].id,
        userId: data[0].user_id,
        projectId: data[0].project_id,
        categoryId: data[0].category_id,
        amount: data[0].amount,
        date: data[0].date,
        merchant: data[0].merchant,
        description: data[0].description,
        imageUrl: data[0].image_url,
        status: data[0].status,
        rejectionReason: data[0].rejection_reason,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
      } as Receipt;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateReceiptStatus = createAsyncThunk(
  'receipts/updateReceiptStatus',
  async (
    { receiptId, status, rejectionReason }: { receiptId: string; status: ReceiptStatus; rejectionReason?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('receipts')
        .update({
          status,
          rejection_reason: rejectionReason,
        })
        .eq('id', receiptId)
        .select();

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: data[0].id,
        userId: data[0].user_id,
        projectId: data[0].project_id,
        categoryId: data[0].category_id,
        amount: data[0].amount,
        date: data[0].date,
        merchant: data[0].merchant,
        description: data[0].description,
        imageUrl: data[0].image_url,
        status: data[0].status,
        rejectionReason: data[0].rejection_reason,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at,
      } as Receipt;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReceipt = createAsyncThunk(
  'receipts/deleteReceipt',
  async (receiptId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from('receipts').delete().eq('id', receiptId);

      if (error) throw error;

      return receiptId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const receiptsSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentReceipt: (state, action: PayloadAction<Receipt | null>) => {
      state.currentReceipt = action.payload;
    },
    addPendingReceipt: (state, action: PayloadAction<Omit<Receipt, 'id' | 'createdAt' | 'updatedAt'>>) => {
      // Crear un ID temporal para el recibo pendiente
      const tempId = `temp-${Date.now()}`;
      const now = new Date().toISOString();
      
      state.pendingReceipts.push({
        ...action.payload,
        id: tempId,
        createdAt: now,
        updatedAt: now,
      });
    },
    removePendingReceipt: (state, action: PayloadAction<string>) => {
      state.pendingReceipts = state.pendingReceipts.filter(receipt => receipt.id !== action.payload);
    },
    clearPendingReceipts: (state) => {
      state.pendingReceipts = [];
    },
    // Nuevos reducers para redux-offline
    createReceiptSuccess: (state, action) => {
      // Actualizar el estado después de que se guarde exitosamente el recibo en el servidor
      const index = state.pendingReceipts.findIndex(
        receipt => receipt.tempId === action.meta.receipt.tempId
      );
      if (index !== -1) {
        state.pendingReceipts.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
    },
    createReceiptFailure: (state, action) => {
      // Manejar el error cuando falla la sincronización con el servidor
      state.error = 'Error al crear el recibo en el servidor. Se guardó localmente.';
      state.loading = false;
    },
    addReceiptSuccess: (state, action) => {
      // Actualizar el estado después de que se guarde exitosamente el recibo en el servidor
      const index = state.pendingReceipts.findIndex(
        receipt => receipt.tempId === action.meta.receiptData.tempId
      );
      if (index !== -1) {
        state.pendingReceipts.splice(index, 1);
      }
      state.loading = false;
      state.error = null;
    },
    addReceiptFailure: (state, action) => {
      // Guardar el recibo en pendingReceipts para sincronizar más tarde
      const receipt = {
        ...action.meta.receiptData,
        isOffline: true,
      };
      state.pendingReceipts.push(receipt as Receipt);
      state.error = 'Error al crear el recibo en el servidor. Se guardó localmente.';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Receipts
    builder.addCase(fetchReceipts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
      state.loading = false;
      state.receipts = action.payload;
    });
    builder.addCase(fetchReceipts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Receipts By Project
    builder.addCase(fetchReceiptsByProject.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReceiptsByProject.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
      state.loading = false;
      state.receipts = action.payload;
    });
    builder.addCase(fetchReceiptsByProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Receipt By Id
    builder.addCase(fetchReceiptById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchReceiptById.fulfilled, (state, action: PayloadAction<Receipt>) => {
      state.loading = false;
      state.currentReceipt = action.payload;
    });
    builder.addCase(fetchReceiptById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Receipt
    builder.addCase(updateReceipt.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateReceipt.fulfilled, (state, action: PayloadAction<Receipt>) => {
      state.loading = false;
      state.receipts = state.receipts.map(receipt =>
        receipt.id === action.payload.id ? action.payload : receipt
      );
      state.currentReceipt = action.payload;
    });
    builder.addCase(updateReceipt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Receipt Status
    builder.addCase(updateReceiptStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateReceiptStatus.fulfilled, (state, action: PayloadAction<Receipt>) => {
      state.loading = false;
      state.receipts = state.receipts.map(receipt =>
        receipt.id === action.payload.id ? action.payload : receipt
      );
      if (state.currentReceipt && state.currentReceipt.id === action.payload.id) {
        state.currentReceipt = action.payload;
      }
    });
    builder.addCase(updateReceiptStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Receipt
    builder.addCase(deleteReceipt.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteReceipt.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.receipts = state.receipts.filter(receipt => receipt.id !== action.payload);
      if (state.currentReceipt && state.currentReceipt.id === action.payload) {
        state.currentReceipt = null;
      }
    });
    builder.addCase(deleteReceipt.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { 
  clearError, 
  setCurrentReceipt, 
  addPendingReceipt, 
  removePendingReceipt, 
  clearPendingReceipts 
} = receiptsSlice.actions;
export default receiptsSlice.reducer; 