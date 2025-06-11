import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card, Button, Modal } from '../components/ui';
import ExerciseCard from '../components/ui/ExerciseCard';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  opacity: ${props => props.isCompleted ? 0.7 : 1};
  pointer-events: ${props => props.isCompleted ? 'none' : 'auto'};
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);

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
          {isCompleted && <StatusBadge status="completed">Completo</StatusBadge>}
        </span>
        <Subtitle>
          {activeWorkout.name}<br />
          {getDayName(currentDay)}
        </Subtitle>
      </Title>
      
      <ExerciseList isCompleted={isCompleted}>
        {todayExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.exerciseId}
            exercise={{
              id: exercise.exerciseId,
              name: `Exercício ${exercise.exerciseId}`,
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

      {!isCompleted && (
        <Button 
          variant="primary" 
          size="large" 
          fullWidth 
          onClick={() => setShowConfirmModal(true)}
          style={{ marginTop: '2rem' }}
        >
          Concluir Treino
        </Button>
      )}

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Conclusão"
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
          <p>Você tem certeza que deseja concluir este treino?</p>
          {!todayExercises.every(exercise => exercise.status === "completed") && (
            <Alert>
              ⚠️ Atenção: Nem todos os exercícios foram concluídos. 
              Este treino será salvo como parcial no seu histórico.
            </Alert>
          )}
        </ModalContent>
      </Modal>
    </TreinoContainer>
  );
};

export default Treino; 