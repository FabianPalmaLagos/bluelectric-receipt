import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Receipt } from '../types';

// Tipos para la navegación de autenticación
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AuthNavigationProp<T extends keyof AuthStackParamList> = StackNavigationProp<
  AuthStackParamList,
  T
>;

export type AuthRouteProp<T extends keyof AuthStackParamList> = RouteProp<
  AuthStackParamList,
  T
>;

// Tipos para la navegación principal (tabs)
export type MainTabParamList = {
  Home: undefined;
  Receipts: undefined;
  AddReceipt: undefined;
  Projects: undefined;
  Profile: undefined;
};

export type MainTabNavigationProp<T extends keyof MainTabParamList> = BottomTabNavigationProp<
  MainTabParamList,
  T
>;

export type MainTabRouteProp<T extends keyof MainTabParamList> = RouteProp<
  MainTabParamList,
  T
>;

// Tipos para la navegación de recibos
export type ReceiptStackParamList = {
  ReceiptsList: undefined;
  ReceiptDetail: { receiptId: string };
  EditReceipt: { receipt: Receipt };
  AddComment: { receiptId: string };
};

export type ReceiptNavigationProp<T extends keyof ReceiptStackParamList> = StackNavigationProp<
  ReceiptStackParamList,
  T
>;

export type ReceiptRouteProp<T extends keyof ReceiptStackParamList> = RouteProp<
  ReceiptStackParamList,
  T
>;

// Tipos para la navegación de proyectos
export type ProjectStackParamList = {
  ProjectsList: undefined;
  ProjectDetail: { projectId: string };
  AddProject: undefined;
  EditProject: { projectId: string };
  ProjectCategories: { projectId: string };
};

export type ProjectNavigationProp<T extends keyof ProjectStackParamList> = StackNavigationProp<
  ProjectStackParamList,
  T
>;

export type ProjectRouteProp<T extends keyof ProjectStackParamList> = RouteProp<
  ProjectStackParamList,
  T
>; 