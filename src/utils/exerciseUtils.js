/**
 * Busca informações detalhadas de um exercício usando seu ID
 * @param {string} exerciseId - ID do exercício
 * @param {Object} data - Dados do contexto de storage
 * @returns {Object|null} Informações do exercício ou null se não encontrado
 */
export const getExerciseDetails = (exerciseId, data) => {
  console.log('getExerciseDetails - Input:', { exerciseId, data });
  if (!data || !data.exercises) {
    console.log('getExerciseDetails - Dados inválidos:', { data });
    return null;
  }

  const exerciseData = data.exercises.find(e => e.id === exerciseId.toString());
  console.log('getExerciseDetails - Exercício encontrado:', exerciseData);
  if (!exerciseData) return null;

  return {
    id: exerciseId,
    name: exerciseData.name,
    description: exerciseData.description,
    muscle: exerciseData.muscle,
    difficulty: exerciseData.difficulty,
    sets: exerciseData.sets,
    reps: exerciseData.reps,
    weight: exerciseData.weight,
    status: exerciseData.status
  };
};

/**
 * Busca informações de um treino e seus exercícios
 * @param {string} workoutId - ID do treino
 * @param {string} dayId - ID do dia
 * @param {Object} data - Dados do contexto de storage
 * @returns {Object|null} Informações do treino ou null se não encontrado
 */
export const getWorkoutDetails = (workoutId, dayId, data) => {
  if (!data || !data.workouts) return null;

  const workout = data.workouts.find(w => w.id === workoutId);
  if (!workout) return null;

  const day = Object.values(workout.schedule).find(d => d.id === dayId);
  if (!day) return null;

  return {
    workoutName: workout.name,
    dayName: day.name,
    exercises: day.exercises?.map(exercise => ({
      ...exercise,
      ...getExerciseDetails(exercise.exerciseId, data)
    })) || []
  };
};

/**
 * Busca os dados específicos de treino (séries, repetições e peso) de um exercício
 * @param {string} workoutId - ID do treino
 * @param {string} dayId - ID do dia
 * @param {string} exerciseId - ID do exercício
 * @param {Object} data - Dados do contexto de storage
 * @returns {Object|null} Dados do exercício no treino ou null se não encontrado
 */
export const getExerciseWorkoutData = (workoutId, dayId, exerciseId, data) => {
  console.log('getExerciseWorkoutData - Input:', { workoutId, dayId, exerciseId, data });
  if (!data || !data.workouts) {
    console.log('getExerciseWorkoutData - Dados inválidos:', { data });
    return null;
  }

  const workout = data.workouts.find(w => w.id === workoutId);
  console.log('getExerciseWorkoutData - Treino encontrado:', workout);
  if (!workout) return null;

  const day = Object.values(workout.schedule).find(d => d.id.toString() === dayId.toString());
  console.log('getExerciseWorkoutData - Dia encontrado:', day);
  if (!day) return null;

  const exercise = day.exercises?.find(e => e.exerciseId.toString() === exerciseId.toString());
  console.log('getExerciseWorkoutData - Exercício encontrado:', exercise);
  if (!exercise) return null;

  return {
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
    status: exercise.status
  };
};

/**
 * Busca os dados completos de um exercício em um treino específico
 * @param {string} workoutId - ID do treino
 * @param {string} dayId - ID do dia
 * @param {string} exerciseId - ID do exercício
 * @param {Object} data - Dados do contexto de storage
 * @returns {Object|null} Dados completos do exercício ou null se não encontrado
 */
export const getCompleteExerciseData = (workoutId, dayId, exerciseId, data) => {
  console.log('getCompleteExerciseData - Input:', { workoutId, dayId, exerciseId, data });
  const exerciseDetails = getExerciseDetails(exerciseId, data);
  console.log('getCompleteExerciseData - Detalhes do exercício:', exerciseDetails);
  const workoutData = getExerciseWorkoutData(workoutId, dayId, exerciseId, data);
  console.log('getCompleteExerciseData - Dados do treino:', workoutData);

  if (!exerciseDetails || !workoutData) return null;

  return {
    ...exerciseDetails,
    ...workoutData
  };
}; 