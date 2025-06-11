import { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/initialData.json';
import exercisesData from '../data/exercises.json';

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
      const initialDataWithExercises = { ...initialData, exercises: exercisesData.exercises };
      setData(initialDataWithExercises);
      localStorage.setItem('fitsu_data', JSON.stringify(initialDataWithExercises));
    }
  }, []);

  const updateData = (newData) => {
    const updatedData = { ...data, ...newData };
    setData(updatedData);
    localStorage.setItem('fitsu_data', JSON.stringify(updatedData));
  };

  const resetData = () => {
    const initialDataWithExercises = { ...initialData, exercises: exercisesData.exercises };
    setData(initialDataWithExercises);
    localStorage.setItem('fitsu_data', JSON.stringify(initialDataWithExercises));
  };

  return (
    <StorageContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </StorageContext.Provider>
  );
}; 