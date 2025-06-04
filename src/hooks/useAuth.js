import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser, getUser, removeUser } from '../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há um usuário salvo no localStorage
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulando uma requisição de login
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha no login');
      }

      const userData = await response.json();
      const userWithEmail = {
        ...userData,
        email,
      };

      saveUser(userWithEmail);
      setUser(userWithEmail);
      return userWithEmail;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = () => {
    removeUser();
    setUser(null);
    navigate('/login');
  };

  const register = async (userData) => {
    try {
      // Simulando uma requisição de registro
      const response = await fetch('https://api.example.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Falha no registro');
      }

      const newUser = await response.json();
      saveUser(newUser);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
}; 