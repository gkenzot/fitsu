import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card, Button, Modal } from '../components/ui';
import ExerciseCard from '../components/ui/ExerciseCard';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';

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
  gap: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.lg};
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
  opacity: ${props => props.$isCompleted ? 0.7 : 1};
  pointer-events: ${props => props.$isCompleted ? 'none' : 'auto'};
`;

const StatusBadge = styled.span`
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: ${props => props.theme.spacing.sm};
`;

const RestDayMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.2rem;
  margin-top: ${props => props.theme.spacing.xl};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Alert = styled.div`
  background-color: ${props => props.theme.colors.warning}20;
  border: 1px solid ${props => props.theme.colors.warning};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.warning};
  font-size: 0.9rem;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ModalCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled.label`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  user-select: none;
  &:disabled {
    cursor: not-allowed;
  }
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  const getExerciseName = (exerciseId) => {
    const exercise = data.exercises.find(ex => ex.id === exerciseId.toString());
    return exercise ? exercise.name : `Exercício ${exerciseId}`;
  };

  useEffect(() => {
    if (data?.workoutHistory) {
      const today = new Date().toISOString().split('T')[0];
      const todayWorkout = data.workoutHistory[today];
      setIsCompleted(todayWorkout?.status === 'completed');
    }
  }, [data]);

  if (!data || !data.workouts) {
    return <div>Carregando...</div>;
  }

  // Encontrar o treino ativo
  const activeWorkout = data.workouts.find(workout => workout.status === 'active');
  
  if (!activeWorkout) {
    return (
      <TreinoContainer>
        <Title>Treino</Title>
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

  const handleExerciseStatusChange = (exerciseId, status) => {
    const updatedWorkouts = data.workouts.map(workout => {
      if (workout.id === activeWorkout.id) {
        const updatedSchedule = { ...workout.schedule };
        updatedSchedule[currentDay] = {
          ...updatedSchedule[currentDay],
          exercises: updatedSchedule[currentDay].exercises.map(exercise => {
            if (exercise.exerciseId === exerciseId) {
              return { ...exercise, status };
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
    
    // Verifica se todos os exercícios foram concluídos
    const allExercisesCompleted = todayExercises.every(exercise => exercise.status === "completed");
    
    workoutHistory[today] = {
      weekId: activeWorkout.id === 1 ? 1 : 2,
      dayId: activeWorkout.schedule[currentDay]?.id,
      workoutId: activeWorkout.id,
      status: allExercisesCompleted ? "completed" : "partial",
      exercises: todayExercises.map(exercise => ({
        exerciseId: exercise.exerciseId,
        name: `Exercício ${exercise.exerciseId}`,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        status: exercise.status
      }))
    };
    
    updateData({ ...data, workoutHistory });
    setIsCompleted(true);
    setShowConfirmModal(false);
  };

  return (
    <TreinoContainer>
      <Title>
        <span>
          {activeWorkout.schedule[currentDay]?.name || getDayName(currentDay)}
          {isCompleted && <StatusBadge $status="completed">Completo</StatusBadge>}
        </span>
      </Title>
      <Subtitle>
        {activeWorkout.name} | {getDayName(currentDay)}
      </Subtitle>
      
      {todayExercises.length > 0 ? (
        <ExerciseList $isCompleted={isCompleted}>
          {todayExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.exerciseId}
              exercise={{
                id: exercise.exerciseId,
                name: getExerciseName(exercise.exerciseId),
                sets: exercise.sets,
                reps: exercise.reps,
                weight: exercise.weight,
                status: exercise.status
              }}
              onUpdateWeight={handleUpdateWeight}
              onStatusChange={handleExerciseStatusChange}
              isCompleted={isCompleted}
            />
          ))}
        </ExerciseList>
      ) : (
        <RestDayMessage>
          Hoje é dia de descanso! Aproveite para se recuperar e manter a consistência do seu treino.
        </RestDayMessage>
      )}

      {!isCompleted && todayExercises.length > 0 && (
        <Button
          variant="primary"
          onClick={() => setShowConfirmModal(true)}
          style={{ marginTop: '2rem' }}
        >
          Concluir Treino
        </Button>
      )}

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Concluir Treino"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConcludeWorkout}
            >
              Confirmar
            </Button>
          </>
        }
      >
        <ModalContent>
          <p>Tem certeza que deseja concluir este treino?</p>
          <p>Esta ação não pode ser desfeita.</p>
        </ModalContent>
      </Modal>
    </TreinoContainer>
  );
};

export default Treino; 