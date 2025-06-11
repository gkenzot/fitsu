import styled from 'styled-components';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Card from './Card';

const HistoryCardContainer = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
`;

const Status = styled.span`
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

const Info = styled.div`
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
  const exerciseData = data.exercises.find(e => e.id === exerciseId.toString());
  if (!exerciseData) return null;

  return {
    exerciseId,
    name: exerciseData.name
  };
};

const HistoryCard = ({ date, workout, data }) => {
  const workoutInfo = getWorkoutInfo(workout.workoutId, workout.dayId, data);

  return (
    <HistoryCardContainer>
      <Header>
        <Date>
          {format(new Date(date + 'T00:00:00'), 'dd/MM/yyyy', { locale: ptBR })} - {getDayName(date)}
        </Date>
        <Status status={workout.status}>
          {getStatusText(workout.status)}
        </Status>
      </Header>
      
      {workoutInfo && (
        <Info>
          {workoutInfo.workoutName} - {workoutInfo.dayName}
        </Info>
      )}

      {workout.status === 'missed' ? (
        <Info>Motivo: {workout.reason}</Info>
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
    </HistoryCardContainer>
  );
};

export default HistoryCard; 