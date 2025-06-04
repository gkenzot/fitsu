import { createContext, useContext, useState, useEffect } from 'react';
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
      setData(JSON.parse(storedData));
    } else {
      setData(initialData);
      localStorage.setItem('fitsu_data', JSON.stringify(initialData));
    }
  }, []);

  const updateData = (newData) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    localStorage.setItem('fitsu_data', JSON.stringify(updatedData));
  };

  const resetData = () => {
    setData(initialData);
    localStorage.setItem('fitsu_data', JSON.stringify(initialData));
  };

  return (
    <StorageContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </StorageContext.Provider>
  );
}; 