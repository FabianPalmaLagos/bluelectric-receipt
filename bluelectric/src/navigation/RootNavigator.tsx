import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator: React.FC = () => {
  // Esto se implementará cuando configuremos Redux
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  // Por ahora, usaremos un valor fijo para desarrollo
  const isAuthenticated = false;

  return (
    isAuthenticated ? <MainNavigator /> : <AuthNavigator />
  );
};

export default RootNavigator; 