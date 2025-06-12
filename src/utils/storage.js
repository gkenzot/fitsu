// Chaves para o localStorage
const STORAGE_KEYS = {
  USER: 'fitsu_user',
  WORKOUTS: 'fitsu_workouts',
  WORKOUT_HISTORY: 'fitsu_workout_history'
};

// Funções para usuário
export const saveUser = (userData) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Funções para treinos
export const saveWorkouts = (workouts) => {
  localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
};

export const getWorkouts = () => {
  const workouts = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
  return workouts ? JSON.parse(workouts) : [];
};

export const addWorkout = (workout) => {
  const workouts = getWorkouts();
  workouts.push({
    ...workout,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  });
  saveWorkouts(workouts);
};

export const updateWorkout = (workoutId, updatedData) => {
  const workouts = getWorkouts();
  const index = workouts.findIndex(w => w.id === workoutId);
  if (index !== -1) {
    workouts[index] = {
      ...workouts[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    saveWorkouts(workouts);
  }
};

export const deleteWorkout = (workoutId) => {
  const workouts = getWorkouts();
  const filteredWorkouts = workouts.filter(w => w.id !== workoutId);
  saveWorkouts(filteredWorkouts);
};

// Funções para histórico de treinos
export const saveWorkoutHistory = (history) => {
  localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
};

export const getWorkoutHistory = () => {
  const history = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
  return history ? JSON.parse(history) : [];
};

export const addWorkoutToHistory = (workout) => {
  const history = getWorkoutHistory();
  history.push({
    ...workout,
    completedAt: new Date().toISOString()
  });
  saveWorkoutHistory(history);
}; 