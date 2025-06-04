import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card, Button } from '../components/ui';

const TreinoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
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

const WorkoutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const WorkoutInfo = styled.div`
  flex: 1;
`;

const WorkoutName = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const WorkoutStatus = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  background-color: ${props => {
    switch (props.status) {
      case 'active':
        return props.theme.colors.primary;
      case 'completed':
        return props.theme.colors.success;
      default:
        return props.theme.colors.text.secondary;
    }
  }};
  color: white;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ExerciseCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ExerciseName = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
`;

const ExerciseDetails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const ExerciseNotes = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-top: ${props => props.theme.spacing.sm};
  font-style: italic;
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
  const { data } = useStorageContext();

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

  return (
    <TreinoContainer>
      <Title>
        Treino do Dia
        <DayBadge>{getDayName(currentDay)}</DayBadge>
      </Title>
      
      <WorkoutCard>
        <WorkoutHeader>
          <WorkoutInfo>
            <WorkoutName>{activeWorkout.name}</WorkoutName>
            <WorkoutStatus status={activeWorkout.status}>
              {getStatusText(activeWorkout.status)}
            </WorkoutStatus>
          </WorkoutInfo>
        </WorkoutHeader>

        <ExerciseList>
          {todayExercises.map((exercise) => {
            const exerciseData = data.exercises.find(e => e.id === exercise.exerciseId);
            return (
              <ExerciseCard key={exercise.exerciseId}>
                <ExerciseHeader>
                  <ExerciseName>{exerciseData?.name || 'Exercício'}</ExerciseName>
                  <ExerciseDetails>
                    <span>{exercise.sets} séries</span>
                    <span>{exercise.reps} repetições</span>
                    <span>{exercise.weight}kg</span>
                  </ExerciseDetails>
                </ExerciseHeader>
                {exercise.notes && (
                  <ExerciseNotes>{exercise.notes}</ExerciseNotes>
                )}
              </ExerciseCard>
            );
          })}
        </ExerciseList>
      </WorkoutCard>
    </TreinoContainer>
  );
};

export default Treino; 