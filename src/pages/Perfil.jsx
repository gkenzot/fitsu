import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../contexts/StorageContext';
import { Card, Button } from '../components/ui';

const PerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProfileCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProfileEmail = styled.p`
  color: ${props => props.theme.colors.text.secondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const WorkoutHistory = styled.section`
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

const WorkoutDate = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const WorkoutStatus = styled.span`
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

const getStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'Completo';
    case 'partial':
      return 'Parcial';
    case 'missed':
      return 'Perdido';
    default:
      return status;
  }
};

const Perfil = () => {
  const { data } = useStorageContext();
  const navigate = useNavigate();

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <PerfilContainer>
      <Title>Meu Perfil</Title>
      
      <ProfileCard>
        <ProfileHeader>
          <ProfileInfo>
            <ProfileName>{data.user.name}</ProfileName>
            <ProfileEmail>{data.user.email}</ProfileEmail>
          </ProfileInfo>
          <Button onClick={() => navigate('/app/editar-perfil')}>
            Editar Perfil
          </Button>
        </ProfileHeader>

        <StatsGrid>
          <StatCard>
            <StatValue>{data.user.height}cm</StatValue>
            <StatLabel>Altura</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{data.user.weight}kg</StatValue>
            <StatLabel>Peso</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{data.user.age} anos</StatValue>
            <StatLabel>Idade</StatLabel>
          </StatCard>
        </StatsGrid>
      </ProfileCard>

      <WorkoutHistory>
        <Title>Histórico de Treinos</Title>
        <WorkoutList>
          {Object.entries(data.workoutHistory)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([date, workout]) => (
              <WorkoutCard key={date}>
                <WorkoutDate>
                  {new Date(date).toLocaleDateString('pt-BR')} - {workout.dayOfWeek}
                </WorkoutDate>
                <WorkoutStatus status={workout.status}>
                  {getStatusText(workout.status)}
                </WorkoutStatus>
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
      </WorkoutHistory>
    </PerfilContainer>
  );
};

export default Perfil; 