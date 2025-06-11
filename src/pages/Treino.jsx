import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card, Button } from '../components/ui';
import ExerciseCard from '../components/ui/ExerciseCard';
import { useState } from 'react';

const TreinoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1rem;
  margin: 0;
  text-align: right;
`;

const DayBadge = styled.span`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: normal;
`;

const WorkoutCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  background-color: ${props => {
    switch (props.status) {
      case 'completed':
        return props.theme.colors.success;
      case 'partial':
        return props.theme.colors.warning;
      case 'missed':
        return props.theme.colors.error;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
  color: white;
  margin-left: ${props => props.theme.spacing.sm};
`;

const getStatusText = (status) => {
  switch (status) {
    case 'active':
      return 'Em Andamento';
    case 'completed':
      return 'Finalizado';
    default:
      return status;
  }
};

const getDayName = (day) => {
  const days = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return days[day] || day;
};

const getCurrentDay = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
};

const Treino = () => {
  const { data, updateData } = useStorageContext();
  const [isCompleted, setIsCompleted] = useState(false);

  if (!data) {
    return <div>Carregando...</div>;
  }

  // Encontrar o treino ativo
  const activeWorkout = data.workouts.find(workout => workout.status === 'active');
  
  if (!activeWorkout) {
    return (
      <TreinoContainer>
        <Title>Nenhum treino ativo no momento</Title>
      </TreinoContainer>
    );
  }

  // Obter o dia atual
  const currentDay = getCurrentDay();

  // Obter os exercícios do dia atual
  const todayExercises = activeWorkout.schedule[currentDay]?.exercises || [];

  const handleUpdateWeight = (exerciseId, newWeight) => {
    const updatedWorkouts = data.workouts.map(workout => {
      if (workout.id === activeWorkout.id) {
        const updatedSchedule = { ...workout.schedule };
        updatedSchedule[currentDay] = {
          ...updatedSchedule[currentDay],
          exercises: updatedSchedule[currentDay].exercises.map(exercise => {
            if (exercise.exerciseId === exerciseId) {
              return { ...exercise, weight: newWeight };
            }
            return exercise;
          })
        };
        return { ...workout, schedule: updatedSchedule };
      }
      return workout;
    });

    updateData({ ...data, workouts: updatedWorkouts });
  };

  const handleConcludeWorkout = () => {
    const today = new Date().toISOString().split('T')[0];
    const workoutHistory = data.workoutHistory || {};
    workoutHistory[today] = {
      week: "Semana Atual",
      dayOfWeek: getDayName(currentDay),
      workoutId: activeWorkout.id,
      status: "completed",
      exercises: todayExercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        name: data.exercises.find(e => e.id === exercise.exerciseId)?.name || 'Exercício',
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        status: "completed"
      }))
    };
    updateData({ ...data, workoutHistory });
    setIsCompleted(true);
  };

  return (
    <TreinoContainer>
      <Title>
        <span>
          {activeWorkout.schedule[currentDay]?.name || getDayName(currentDay)}
          {isCompleted && <StatusBadge status="completed">Completo</StatusBadge>}
        </span>
        <Subtitle>
          {activeWorkout.name}<br />
          {getDayName(currentDay)}
        </Subtitle>
      </Title>
      
      <ExerciseList>
        {todayExercises.map((exercise) => {
          const exerciseData = data.exercises.find(e => e.id === exercise.exerciseId);
          return (
            <ExerciseCard
              key={exercise.exerciseId}
              exercise={{
                id: exercise.exerciseId,
                name: exerciseData?.name || 'Exercício',
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight
              }}
              onUpdateWeight={handleUpdateWeight}
            />
          );
        })}
      </ExerciseList>

      {!isCompleted && (
        <Button 
          variant="primary" 
          size="large" 
          fullWidth 
          onClick={handleConcludeWorkout}
          style={{ marginTop: '2rem' }}
        >
          Concluir Treino
        </Button>
      )}
    </TreinoContainer>
  );
};

export default Treino; 