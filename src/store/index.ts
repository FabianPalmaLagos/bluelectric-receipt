import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import authReducer from './slices/authSlice';
import receiptsReducer from './slices/receiptsSlice';
import projectsReducer from './slices/projectsSlice';
import uiReducer from './slices/uiSlice';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'receipts'], // Solo persistir estos reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  receipts: receiptsReducer,
  projects: projectsReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Configurar el listener de conexión a internet
NetInfo.addEventListener(state => {
  store.dispatch({ type: 'network/statusChanged', payload: state.isConnected });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;