import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card } from '../components/ui';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const StatCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const RecentWorkouts = styled.section`
  margin-top: ${props => props.theme.spacing.lg};
`;

const WorkoutList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const WorkoutCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
`;

const WorkoutTitle = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ExerciseItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.xs} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Dashboard = () => {
  const { data } = useStorageContext();

  if (!data) {
    return <div>Carregando...</div>;
  }

  // Encontrar o treino ativo
  const activeWorkout = data.workouts.find(workout => workout.status === 'active');
  
  // Calcular estatísticas
  const totalWorkouts = Object.keys(data.workoutHistory).length;
  const completedWorkouts = Object.values(data.workoutHistory).filter(
    workout => workout.status === 'completed'
  ).length;
  
  const totalExercises = Object.values(data.workoutHistory).reduce(
    (acc, workout) => acc + (workout.exercises?.length || 0),
    0
  );

  // Pegar os últimos 3 treinos do histórico
  const recentWorkouts = Object.entries(data.workoutHistory)
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
    .slice(0, 3);

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      
      <StatsGrid>
        <StatCard>
          <StatValue>{totalWorkouts}</StatValue>
          <StatLabel>Total de Treinos</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{completedWorkouts}</StatValue>
          <StatLabel>Treinos Completos</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalExercises}</StatValue>
          <StatLabel>Exercícios Realizados</StatLabel>
        </StatCard>
      </StatsGrid>

      <RecentWorkouts>
        <Title>Treinos Recentes</Title>
        <WorkoutList>
          {recentWorkouts.map(([date, workout]) => (
            <WorkoutCard key={date}>
              <WorkoutTitle>
                {new Date(date).toLocaleDateString('pt-BR')} - {workout.dayOfWeek}
              </WorkoutTitle>
              <ExerciseList>
                {workout.exercises?.map((exercise) => (
                  <ExerciseItem key={exercise.exerciseId}>
                    <span>{exercise.name}</span>
                    <span>
                      {exercise.sets}x{exercise.reps} - {exercise.weight}kg
                    </span>
                  </ExerciseItem>
                ))}
              </ExerciseList>
            </WorkoutCard>
          ))}
        </WorkoutList>
      </RecentWorkouts>
    </DashboardContainer>
  );
};

export default Dashboard; 