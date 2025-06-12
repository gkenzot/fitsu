import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card, Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const StatCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  flex: 1;
  border-left: 4px solid ${props => {
    switch (props.$status) {
      case 'completed':
        return props.theme.colors.success;
      case 'partial':
        return props.theme.colors.warning;
      case 'missed':
        return props.theme.colors.error;
      default:
        return props.theme.colors.border;
    }
  }};
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

const MuscleStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const MuscleCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
`;

const MuscleName = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MuscleCount = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const NoWorkoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const NoWorkoutMessage = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Dashboard = () => {
  const { data } = useStorageContext();
  const navigate = useNavigate();

  if (!data) {
    return <div>Carregando...</div>;
  }

  // Encontrar o treino ativo
  const activeWorkout = data.workouts?.find(workout => workout.status === 'active');
  
  // Calcular estatísticas do histórico
  const workoutHistory = Object.values(data.workoutHistory || {});
  const completedWorkouts = workoutHistory.filter(workout => workout.status === 'completed').length;
  const partialWorkouts = workoutHistory.filter(workout => workout.status === 'partial').length;
  const missedWorkouts = workoutHistory.filter(workout => workout.status === 'missed').length;

  // Calcular estatísticas por grupo muscular do treino ativo
  const muscleStats = {};
  if (activeWorkout) {
    Object.values(activeWorkout.schedule).forEach(day => {
      day.exercises?.forEach(exercise => {
        const exerciseData = data.exercises.find(e => e.id === exercise.exerciseId.toString());
        if (exerciseData) {
          const muscle = exerciseData.muscle;
          muscleStats[muscle] = (muscleStats[muscle] || 0) + 1;
        }
      });
    });
  }

  if (!activeWorkout) {
    return (
      <DashboardContainer>
        <Title>Dashboard</Title>
        
        <Subtitle>Frequência</Subtitle>
        <StatsGrid>
          <StatCard $status="completed">
            <StatValue>{completedWorkouts}</StatValue>
            <StatLabel>Completos</StatLabel>
          </StatCard>
          <StatCard $status="partial">
            <StatValue>{partialWorkouts}</StatValue>
            <StatLabel>Parcial</StatLabel>
          </StatCard>
          <StatCard $status="missed">
            <StatValue>{missedWorkouts}</StatValue>
            <StatLabel>Faltados</StatLabel>
          </StatCard>
        </StatsGrid>

        <NoWorkoutContainer>
          <Subtitle>Nenhum treino ativo</Subtitle>
          <NoWorkoutMessage>
            Comece sua jornada fitness criando seu primeiro treino!
          </NoWorkoutMessage>
          <Button
            onClick={() => navigate('/app/novo-treino')}
            style={{ maxWidth: '300px' }}
          >
            <HiPlus size={20} style={{ marginRight: '8px' }} />
            Criar Novo Treino
          </Button>
        </NoWorkoutContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      
      <Subtitle>Frequência</Subtitle>
      <StatsGrid>
        <StatCard $status="completed">
          <StatValue>{completedWorkouts}</StatValue>
          <StatLabel>Completos</StatLabel>
        </StatCard>
        <StatCard $status="partial">
          <StatValue>{partialWorkouts}</StatValue>
          <StatLabel>Parcial</StatLabel>
        </StatCard>
        <StatCard $status="missed">
          <StatValue>{missedWorkouts}</StatValue>
          <StatLabel>Faltados</StatLabel>
        </StatCard>
      </StatsGrid>

      <Subtitle>{activeWorkout.name}</Subtitle>
      <MuscleStats>
        {Object.entries(muscleStats).map(([muscle, count]) => (
          <MuscleCard key={muscle}>
            <MuscleName>{muscle}</MuscleName>
            <MuscleCount>{count}</MuscleCount>
          </MuscleCard>
        ))}
      </MuscleStats>
    </DashboardContainer>
  );
};

export default Dashboard; 