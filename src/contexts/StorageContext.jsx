import { createContext, useContext, useState, useEffect } from 'react';
import exercisesData from '../data/exercises.json';
import initialData from '../data/initialData.json';

const StorageContext = createContext();

export const useStorageContext = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorageContext deve ser usado dentro de um StorageProvider');
  }
  return context;
};

export const StorageProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('fitsu_data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData({ ...parsedData, exercises: exercisesData.exercises });
    } else {
      // Inicializa apenas com os exercícios, sem dados de usuário
      setData({ exercises: exercisesData.exercises });
    }
  }, []);

  const updateData = (newData) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    localStorage.setItem('fitsu_data', JSON.stringify(updatedData));
  };

  const resetData = () => {
    // Reseta para os dados iniciais, incluindo usuário de teste
    const resetData = {
      ...initialData,
      exercises: exercisesData.exercises
    };
    setData(resetData);
    localStorage.setItem('fitsu_data', JSON.stringify(resetData));
    // Salva também o usuário de teste no localStorage
    localStorage.setItem('fitsu_user', JSON.stringify(initialData.user));
  };

  return (
    <StorageContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </StorageContext.Provider>
  );
}; 