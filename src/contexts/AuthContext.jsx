import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData } from '../services/storageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('fitsu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const data = getStorageData();
    
    if (data?.user?.email === email && data?.user?.password === password) {
      const userData = { email: data.user.email };
      setUser(userData);
      localStorage.setItem('fitsu_user', JSON.stringify(userData));
      navigate('/app/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitsu_user');
    navigate('/');
  };

  const deleteAccount = () => {
    setUser(null);
    localStorage.removeItem('fitsu_user');
    localStorage.removeItem('fitsu_data');
    navigate('/');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  if (loading) {
    return null; // ou um componente de loading
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, deleteAccount, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}; 