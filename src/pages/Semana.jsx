import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card } from '../components/ui';

const SemanaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const DayCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => {
    switch (props.status) {
      case 'completed':
        return props.theme.colors.success + '20';
      case 'partial':
        return props.theme.colors.warning + '20';
      case 'missed':
        return props.theme.colors.error + '20';
      case 'open':
        return props.theme.colors.primary + '20';
      case 'locked':
        return props.theme.colors.background.secondary;
      case 'rest':
        return props.theme.colors.background.secondary;
      default:
        return props.theme.colors.background.card;
    }
  }};
`;

const DayTitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const WorkoutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const WorkoutItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const WorkoutName = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-size: 1rem;
`;

const ExerciseCount = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
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
      case 'missed':
        return props.theme.colors.error;
      case 'partial':
        return props.theme.colors.warning;
      case 'open':
        return props.theme.colors.primary;
      case 'locked':
        return props.theme.colors.text.secondary;
      case 'rest':
        return props.theme.colors.text.secondary;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
  color: white;
  margin-left: ${props => props.theme.spacing.sm};
`;

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Completo';
    case 'missed':
      return 'Perdido';
    case 'partial':
      return 'Parcial';
    case 'open':
      return 'Disponível';
    case 'locked':
      return 'Bloqueado';
    case 'rest':
      return 'Descanso';
    default:
      return status;
  }
};

const diasDaSemana = [
  { id: 'monday', name: 'Segunda-feira', emoji: '💪' },
  { id: 'tuesday', name: 'Terça-feira', emoji: '🏋️' },
  { id: 'wednesday', name: 'Quarta-feira', emoji: '🔥' },
  { id: 'thursday', name: 'Quinta-feira', emoji: '💪' },
  { id: 'friday', name: 'Sexta-feira', emoji: '🏋️' },
  { id: 'saturday', name: 'Sábado', emoji: '🔥' },
  { id: 'sunday', name: 'Domingo', emoji: '😴' }
];

const Semana = () => {
  const { data } = useStorageContext();

  if (!data) {
    return <div>Carregando...</div>;
  }

  const activeWorkout = data.workouts.find(workout => workout.status === 'active');

  return (
    <SemanaContainer>
      <Title>Planejamento Semanal</Title>
      {activeWorkout && (
        <Subtitle>
          {activeWorkout.name} - {activeWorkout.schedule[Object.keys(activeWorkout.schedule)[0]]?.name}
        </Subtitle>
      )}

      <WeekGrid>
        {diasDaSemana.map(({ id, name, emoji }) => {
          const dayPlan = data.weeklyPlan[id];
          const workout = dayPlan?.workoutId ? 
            data.workouts.find(w => w.id === dayPlan.workoutId) : null;
          const daySchedule = workout?.schedule[id];
          const exerciseCount = daySchedule?.exercises?.length || 0;

          return (
            <DayCard key={id} status={dayPlan?.status}>
              <DayTitle>
                {emoji} {name}
                {dayPlan?.status && (
                  <StatusBadge status={dayPlan.status}>
                    {getStatusText(dayPlan.status)}
                  </StatusBadge>
                )}
              </DayTitle>

              {daySchedule ? (
                <WorkoutList>
                  <WorkoutItem>
                    <WorkoutName>{daySchedule.name}</WorkoutName>
                    <ExerciseCount>{exerciseCount} exercícios</ExerciseCount>
                  </WorkoutItem>
                </WorkoutList>
              ) : (
                <WorkoutList>
                  <WorkoutItem>
                    <WorkoutName>Dia de Descanso</WorkoutName>
                    <ExerciseCount>Recuperação e regeneração</ExerciseCount>
                  </WorkoutItem>
                </WorkoutList>
              )}
            </DayCard>
          );
        })}
      </WeekGrid>
    </SemanaContainer>
  );
};

export default Semana; 