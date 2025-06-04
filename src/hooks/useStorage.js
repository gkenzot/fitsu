import { useState, useEffect } from 'react';
import { getStorageData, updateStorageData, addWorkout, updateWorkout, deleteWorkout } from '../services/storageService';

export const useStorage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const storageData = getStorageData();
      setData(storageData);
      setLoading(false);
    };

    loadData();
  }, []);

  const updateData = (newData) => {
    updateStorageData(newData);
    setData(prevData => ({ ...prevData, ...newData }));
  };

  const addNewWorkout = (workout) => {
    addWorkout(workout);
    setData(prevData => ({
      ...prevData,
      workouts: [...prevData.workouts, workout]
    }));
  };

  const editWorkout = (workoutId, updatedWorkout) => {
    updateWorkout(workoutId, updatedWorkout);
    setData(prevData => ({
      ...prevData,
      workouts: prevData.workouts.map(workout =>
        workout.id === workoutId ? updatedWorkout : workout
      )
    }));
  };

  const removeWorkout = (workoutId) => {
    deleteWorkout(workoutId);
    setData(prevData => ({
      ...prevData,
      workouts: prevData.workouts.filter(workout => workout.id !== workoutId)
    }));
  };

  return {
    data,
    loading,
    updateData,
    addNewWorkout,
    editWorkout,
    removeWorkout
  };
}; 