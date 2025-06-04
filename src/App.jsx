import { useEffect } from 'react';
import AppRoutes from './routes';
import { initializeStorage } from './services/storageService';
import { StorageProvider } from './contexts/StorageContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <StorageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </StorageProvider>
  );
}

export default App;
