import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Receipt, ReceiptStatus } from '../../types';
import { db, numberToStringId, stringToNumberId } from '../../utils/db/exports';

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
      const data = await db.query(
        'SELECT * FROM receipts WHERE user_id = ? ORDER BY created_at DESC',
        [stringToNumberId(userId)]
      );

      // Transformar los datos
      return data.map((receipt: any) => ({
        id: numberToStringId(receipt.id),
        userId: numberToStringId(receipt.user_id),
        projectId: numberToStringId(receipt.project_id),
        categoryId: receipt.category_id ? numberToStringId(receipt.category_id) : null,
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
      const data = await db.query(
        'SELECT * FROM receipts WHERE project_id = ? ORDER BY created_at DESC',
        [stringToNumberId(projectId)]
      );

      // Transformar los datos
      return data.map((receipt: any) => ({
        id: numberToStringId(receipt.id),
        userId: numberToStringId(receipt.user_id),
        projectId: numberToStringId(receipt.project_id),
        categoryId: receipt.category_id ? numberToStringId(receipt.category_id) : null,
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
      const data = await db.query(
        'SELECT * FROM receipts WHERE id = ? LIMIT 1',
        [stringToNumberId(receiptId)]
      );

      if (!data || data.length === 0) {
        throw new Error('Recibo no encontrado');
      }

      // Transformar los datos
      return {
        id: numberToStringId(data[0].id),
        userId: numberToStringId(data[0].user_id),
        projectId: numberToStringId(data[0].project_id),
        categoryId: data[0].category_id ? numberToStringId(data[0].category_id) : null,
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

// Acción para crear un recibo adaptada a redux-offline
export const createReceipt = (receipt: Omit<Receipt, 'id'>) => ({
  type: 'receipts/createReceipt',
  payload: receipt,
  meta: {
    offline: {
      // Lo que se hace cuando estamos desconectados
      effect: {
        url: 'offline/receipts/create',
        method: 'POST',
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
    isOffline: true, // Ahora siempre está en modo offline
    status: 'pending', // Estado inicial
  },
  meta: {
    offline: {
      // Lo que se hace cuando estamos desconectados
      effect: {
        url: 'offline/receipts/add',
        method: 'POST',
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
      const updateData = {
        project_id: stringToNumberId(receipt.projectId),
        category_id: receipt.categoryId ? stringToNumberId(receipt.categoryId) : null,
        amount: receipt.amount,
        date: receipt.date,
        merchant: receipt.merchant,
        description: receipt.description,
        image_url: receipt.imageUrl,
        status: receipt.status,
        rejection_reason: receipt.rejectionReason,
        updated_at: new Date().toISOString()
      };

      await db.update(
        'receipts',
        updateData,
        { id: stringToNumberId(receipt.id) }
      );

      // Obtener el registro actualizado
      const updated = await db.query(
        'SELECT * FROM receipts WHERE id = ? LIMIT 1',
        [stringToNumberId(receipt.id)]
      );

      if (!updated || updated.length === 0) {
        throw new Error('No se pudo actualizar el recibo');
      }

      // Transformar los datos
      return {
        id: numberToStringId(updated[0].id),
        userId: numberToStringId(updated[0].user_id),
        projectId: numberToStringId(updated[0].project_id),
        categoryId: updated[0].category_id ? numberToStringId(updated[0].category_id) : null,
        amount: updated[0].amount,
        date: updated[0].date,
        merchant: updated[0].merchant,
        description: updated[0].description,
        imageUrl: updated[0].image_url,
        status: updated[0].status,
        rejectionReason: updated[0].rejection_reason,
        createdAt: updated[0].created_at,
        updatedAt: updated[0].updated_at,
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
      const { data, error } = await db.update(
        'receipts',
        {
          status,
          rejection_reason: rejectionReason,
        },
        { id: stringToNumberId(receiptId) }
      );

      if (error) throw error;

      // Transformar los datos de snake_case a camelCase
      return {
        id: numberToStringId(data[0].id),
        userId: numberToStringId(data[0].user_id),
        projectId: numberToStringId(data[0].project_id),
        categoryId: data[0].category_id ? numberToStringId(data[0].category_id) : null,
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
      const { error } = await db.delete(
        'receipts',
        { id: stringToNumberId(receiptId) }
      );

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