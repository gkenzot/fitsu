import initialData from '../data/initialData.json';

const STORAGE_KEY = 'fitsu_data';

export const initializeStorage = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

export const getStorageData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const updateStorageData = (newData) => {
  const currentData = getStorageData();
  const updatedData = {
    ...currentData,
    ...newData
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
};

export const addWorkout = (workout) => {
  const currentData = getStorageData();
  const updatedWorkouts = [...currentData.workouts, workout];
  updateStorageData({ ...currentData, workouts: updatedWorkouts });
};

export const updateWorkout = (workoutId, updatedWorkout) => {
  const currentData = getStorageData();
  const updatedWorkouts = currentData.workouts.map(workout => 
    workout.id === workoutId ? updatedWorkout : workout
  );
  updateStorageData({ ...currentData, workouts: updatedWorkouts });
};

export const deleteWorkout = (workoutId) => {
  const currentData = getStorageData();
  const updatedWorkouts = currentData.workouts.filter(workout => workout.id !== workoutId);
  updateStorageData({ ...currentData, workouts: updatedWorkouts });
}; 