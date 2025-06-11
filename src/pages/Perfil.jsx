import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../contexts/StorageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../components/ui';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
    default:
      return 'Pendente';
  }
};

const getDayName = (date) => {
  const localDate = new Date(date + 'T00:00:00');
  return format(localDate, 'EEEE', { locale: ptBR });
};

const getWorkoutInfo = (workoutId, dayId, data) => {
  if (!data?.workouts) return null;
  
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
  if (!data?.workouts) return null;
  
  const workout = data.workouts.find(w => w.id === workoutId);
  if (!workout) return null;

  const day = Object.values(workout.schedule).find(d => d.id === dayId);
  if (!day) return null;

  const exercise = day.exercises.find(e => e.exerciseId === exerciseId);
  if (!exercise) return null;

  // Como não temos a lista de exercícios no initialData, vamos usar o ID como nome temporariamente
  return {
    ...exercise,
    name: `Exercício ${exerciseId}`
  };
};

const Perfil = () => {
  const { data } = useStorageContext();
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (!data || !data.user || !data.workouts) {
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={() => navigate('/app/editar-perfil')}>
              Editar Perfil
            </Button>
          </div>
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
          {data.workoutHistory && Object.entries(data.workoutHistory).map(([date, workout]) => {
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
      </WorkoutHistory>

      <Button onClick={logout} variant="secondary" style={{ alignSelf: 'center', marginTop: '2rem' }}>
        Sair
      </Button>
    </PerfilContainer>
  );
};

export default Perfil; 