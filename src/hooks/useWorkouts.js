import { useState, useEffect } from 'react';
import {
  getWorkouts,
  saveWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutHistory,
  addWorkoutToHistory
} from '../utils/storage';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega treinos e histórico do localStorage
    const savedWorkouts = getWorkouts();
    const savedHistory = getWorkoutHistory();
    setWorkouts(savedWorkouts);
    setHistory(savedHistory);
    setLoading(false);
  }, []);

  const createWorkout = (workoutData) => {
    const newWorkout = {
      ...workoutData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      exercises: workoutData.exercises || []
    };
    
    addWorkout(newWorkout);
    setWorkouts(prev => [...prev, newWorkout]);
    return newWorkout;
  };

  const editWorkout = (workoutId, updatedData) => {
    updateWorkout(workoutId, updatedData);
    setWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, ...updatedData, updatedAt: new Date().toISOString() }
          : workout
      )
    );
  };

  const removeWorkout = (workoutId) => {
    deleteWorkout(workoutId);
    setWorkouts(prev => prev.filter(workout => workout.id !== workoutId));
  };

  const completeWorkout = (workoutId) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
      const completedWorkout = {
        ...workout,
        completedAt: new Date().toISOString()
      };
      addWorkoutToHistory(completedWorkout);
      setHistory(prev => [...prev, completedWorkout]);
    }
  };

  const getWorkoutStats = () => {
    const stats = {
      totalWorkouts: workouts.length,
      completedWorkouts: history.length,
      lastWorkout: history[history.length - 1]?.completedAt || null,
      mostFrequentExercise: getMostFrequentExercise(),
      totalExercises: getTotalExercises()
    };
    return stats;
  };

  const getMostFrequentExercise = () => {
    const exerciseCount = {};
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        exerciseCount[exercise.name] = (exerciseCount[exercise.name] || 0) + 1;
      });
    });

    return Object.entries(exerciseCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || null;
  };

  const getTotalExercises = () => {
    return workouts.reduce((total, workout) => total + workout.exercises.length, 0);
  };

  return {
    workouts,
    history,
    loading,
    createWorkout,
    editWorkout,
    removeWorkout,
    completeWorkout,
    getWorkoutStats
  };
}; 