import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card } from '../components/ui';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const HistoricoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WorkoutList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const WorkoutHistoryCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const WorkoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WorkoutDate = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
`;

const WorkoutStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => {
    switch (props.status) {
      case 'completed':
        return props.theme.colors.success;
      case 'partial':
        return props.theme.colors.warning;
      case 'missed':
        return props.theme.colors.error;
      case 'pending':
        return props.theme.colors.error;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
  color: white;
`;

const WorkoutInfo = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.sm} 0 0 0;
`;

const ExerciseItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ExerciseStatus = styled.span`
  color: ${props => {
    switch (props.status) {
      case 'completed':
        return props.theme.colors.success;
      case 'partial':
        return props.theme.colors.warning;
      case 'missed':
        return props.theme.colors.error;
      case 'pending':
        return props.theme.colors.error;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
`;

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Concluído';
    case 'partial':
      return 'Parcial';
    case 'missed':
      return 'Faltou';
    case 'pending':
      return 'Não realizado';
    default:
      return 'Não realizado';
  }
};

const getDayName = (date) => {
  const localDate = new Date(date + 'T00:00:00');
  return format(localDate, 'EEEE', { locale: ptBR });
};

const getWorkoutInfo = (workoutId, dayId, data) => {
  const workout = data.workouts.find(w => w.id === workoutId);
  if (!workout) return null;

  const day = Object.values(workout.schedule).find(d => d.id === dayId);
  if (!day) return null;

  return {
    workoutName: workout.name,
    dayName: day.name
  };
};

const getExerciseInfo = (workoutId, dayId, exerciseId, data) => {
  // Busca o exercício diretamente no array de exercícios usando o exerciseId
  const exerciseData = data.exercises.find(e => e.id === exerciseId.toString());
  if (!exerciseData) return null;

  return {
    exerciseId,
    name: exerciseData.name
  };
};

const Historico = () => {
  const { data } = useStorageContext();

  if (!data || !data.workouts) {
    return <div>Carregando...</div>;
  }

  return (
    <HistoricoContainer>
      <Title>Histórico de Treinos</Title>
      <WorkoutList>
        {data.workoutHistory && Object.entries(data.workoutHistory)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
          .map(([date, workout]) => {
          const workoutInfo = getWorkoutInfo(workout.workoutId, workout.dayId, data);
          if (!workoutInfo) return null;

          return (
            <WorkoutHistoryCard key={date}>
              <WorkoutHeader>
                <WorkoutDate>
                  {format(new Date(date + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR })} - {getDayName(date)}
                </WorkoutDate>
                <WorkoutStatus status={workout.status}>
                  {getStatusText(workout.status)}
                </WorkoutStatus>
              </WorkoutHeader>
              
              <WorkoutInfo>
                {workoutInfo.workoutName} - {workoutInfo.dayName}
              </WorkoutInfo>

              {workout.status === 'missed' ? (
                <WorkoutInfo>Motivo: {workout.reason}</WorkoutInfo>
              ) : (
                <ExerciseList>
                  {workout.exercises?.map((exercise) => {
                    const exerciseInfo = getExerciseInfo(workout.workoutId, workout.dayId, exercise.exerciseId, data);
                    if (!exerciseInfo) return null;
                    
                    return (
                      <ExerciseItem key={exercise.exerciseId}>
                        <span>{exerciseInfo.name}</span>
                        <ExerciseStatus status={exercise.status}>
                          {getStatusText(exercise.status)}
                        </ExerciseStatus>
                      </ExerciseItem>
                    );
                  })}
                </ExerciseList>
              )}
            </WorkoutHistoryCard>
          );
        })}
      </WorkoutList>
    </HistoricoContainer>
  );
};

export default Historico; 