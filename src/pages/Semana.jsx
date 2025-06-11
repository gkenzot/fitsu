import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card } from '../components/ui';
import ExerciseDetails from '../components/ui/ExerciseDetails';
import { useState } from 'react';
import { getCompleteExerciseData } from '../utils/exerciseUtils';
import { HiOutlineClock } from 'react-icons/hi';
import { HiPlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const SemanaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HistoryButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.sm};
`;

const DayCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => {
    switch (props.$status) {
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
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const DayTitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 4px;
  font-size: 1rem;
`;

const WorkoutList = styled.div`
  display: flex;
  flex-direction: column;
`;

const WorkoutItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background.hover};
  }
`;

const WorkoutInfo = styled.div`
  flex: 1;
`;

const WorkoutCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:checked {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primaryDark};
  }

  &:checked:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const WorkoutName = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 2px;
  font-size: 0.9rem;
`;

const ExerciseCount = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.8rem;
  margin: 0;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-top: 8px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const WorkoutDate = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

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
  const { data, updateData } = useStorageContext();
  const [expandedDay, setExpandedDay] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const navigate = useNavigate();

  const handleWorkoutSelect = (workoutId) => {
    // Atualizar o status dos treinos
    const updatedWorkouts = data.workouts.map(workout => ({
      ...workout,
      status: workout.id === workoutId ? 'active' : 'completed'
    }));

    // Atualizar os dados
    updateData({
      ...data,
      workouts: updatedWorkouts
    });
  };

  if (!data || !data.workouts) {
    return <div>Carregando...</div>;
  }

  const activeWorkout = data.workouts.find(workout => workout.status === 'active');

  if (!activeWorkout) {
    return (
      <SemanaContainer>
        <Title>Nenhum treino ativo no momento</Title>
      </SemanaContainer>
    );
  }

  const handleDayClick = (dayId) => {
    setExpandedDay(expandedDay === dayId ? null : dayId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <SemanaContainer>
      <Title>
        <span>{activeWorkout.name}</span>
        <ButtonGroup>
          <IconButton 
            title="Novo Treino"
            onClick={() => navigate('/app/novo-treino')}
          >
            <HiPlus size={24} />
          </IconButton>
          <IconButton 
            title="Histórico"
            onClick={() => setShowHistoryModal(true)}
          >
            <HiOutlineClock size={24} />
          </IconButton>
        </ButtonGroup>
      </Title>

      {showHistoryModal && (
        <Modal onClick={() => setShowHistoryModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Histórico de Treinos</ModalTitle>
              <CloseButton onClick={() => setShowHistoryModal(false)}>×</CloseButton>
            </ModalHeader>
            <WorkoutList>
              {data.workouts.map(workout => (
                <WorkoutItem key={workout.id}>
                  <WorkoutInfo>
                    <WorkoutName>{workout.name}</WorkoutName>
                    <WorkoutDate>
                      {formatDate(workout.startDate)}
                    </WorkoutDate>
                  </WorkoutInfo>
                  <WorkoutCheckbox
                    type="radio"
                    name="activeWorkout"
                    checked={workout.status === 'active'}
                    onChange={() => handleWorkoutSelect(workout.id)}
                  />
                </WorkoutItem>
              ))}
            </WorkoutList>
          </ModalContent>
        </Modal>
      )}

      <WeekGrid>
        {diasDaSemana.map(({ id, name, emoji }) => {
          const daySchedule = activeWorkout.schedule[id];
          const exerciseCount = daySchedule?.exercises?.length || 0;
          const status = daySchedule ? 'open' : 'rest';
          const isExpanded = expandedDay === id;

          return (
            <DayCard 
              key={id} 
              $status={status}
              onClick={() => handleDayClick(id)}
            >
              <DayTitle>{name}</DayTitle>

              {daySchedule ? (
                <>
                  <WorkoutList>
                    <WorkoutItem>
                      <WorkoutName>{daySchedule.name}</WorkoutName>
                      <ExerciseCount>{exerciseCount} exercícios</ExerciseCount>
                    </WorkoutItem>
                  </WorkoutList>
                  
                  {isExpanded && (
                    <ExerciseList>
                      {daySchedule.exercises.map((exercise) => {
                        console.log('Semana - Dados do exercício:', {
                          workoutId: activeWorkout.id,
                          dayId: daySchedule.id,
                          exerciseId: exercise.exerciseId,
                          exercise
                        });
                        
                        const completeExerciseData = getCompleteExerciseData(
                          activeWorkout.id,
                          daySchedule.id.toString(),
                          exercise.exerciseId,
                          data
                        );
                        
                        console.log('Semana - Dados completos do exercício:', completeExerciseData);
                        
                        if (!completeExerciseData) return null;
                        
                        return (
                          <ExerciseDetails 
                            key={exercise.exerciseId} 
                            exercise={completeExerciseData}
                          />
                        );
                      })}
                    </ExerciseList>
                  )}
                </>
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