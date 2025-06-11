import styled from 'styled-components';
import { useStorageContext } from '../contexts/StorageContext';
import { Card } from '../components/ui';
import ExerciseDetails from '../components/ui/ExerciseDetails';
import { useState } from 'react';
import { getCompleteExerciseData } from '../utils/exerciseUtils';

const SemanaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.sm};
`;

const DayCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
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
  padding: 6px;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
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
  const [expandedDay, setExpandedDay] = useState(null);

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

  return (
    <SemanaContainer>
      <Title>Planejamento Semanal</Title>
      <Subtitle>
        {activeWorkout.name}
      </Subtitle>

      <WeekGrid>
        {diasDaSemana.map(({ id, name, emoji }) => {
          const daySchedule = activeWorkout.schedule[id];
          const exerciseCount = daySchedule?.exercises?.length || 0;
          const status = daySchedule ? 'open' : 'rest';
          const isExpanded = expandedDay === id;

          return (
            <DayCard 
              key={id} 
              status={status}
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
                        const completeExerciseData = getCompleteExerciseData(
                          activeWorkout.id,
                          daySchedule.id,
                          exercise.exerciseId,
                          data
                        );
                        
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