import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Card from '../Card';
import Input from '../Input';
import Button from '../Button';
import { Tag } from '../';
import { flexBetween, flexColumn, hoverEffect, cardBase } from '../../../styles/shared';

const ExerciseHeader = styled.div`
  ${flexBetween}
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ExerciseName = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
  margin: 0;
  cursor: pointer;
  user-select: none;
  &:hover {
    opacity: 0.8;
  }
`;

const ExerciseDetails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.95rem;
`;

const ExerciseInputRow = styled.div`
  ${flexBetween}
  margin-top: ${props => props.theme.spacing.md};
`;

const RightGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-right: auto;
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

const MinimizedCard = styled(Card)`
  opacity: 0.7;
  ${hoverEffect}
  cursor: pointer;
  box-shadow: none;
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  &:hover {
    opacity: 1;
  }
  ${props => props.$concluded && `
    border-left: 4px solid ${props.theme.colors.success};
  `}
`;

const StyledCard = styled(Card)`
  ${hoverEffect}
  box-shadow: none;
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  ${props => props.$concluded && `
    border-left: 4px solid ${props.theme.colors.success};
  `}
`;

const ExerciseSummary = styled.div`
  ${flexBetween}
`;

const MinimizedExerciseCard = ({ exercise, concluded, onClick }) => (
  <MinimizedCard 
    variant="elevated" 
    size="medium" 
    fullWidth 
    $concluded={concluded}
    onClick={onClick}
  >
    <ExerciseSummary>
      <ExerciseName>{exercise.name}</ExerciseName>
      <span>{exercise.sets} x {exercise.reps} {exercise.weight}kg</span>
    </ExerciseSummary>
  </MinimizedCard>
);

const ExerciseCard = ({ exercise, onUpdateWeight, isCompleted, onStatusChange }) => {
  const [newWeight, setNewWeight] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [concluded, setConcluded] = useState(exercise.status === 'completed');

  useEffect(() => {
    if (isCompleted) {
      setMinimized(true);
      setConcluded(true);
    }
  }, [isCompleted]);

  const handleCheck = () => {
    if (newWeight.trim() !== '') {
      onUpdateWeight(exercise.id, parseFloat(newWeight));
      setNewWeight('');
    }
  };

  const handleConclude = (e) => {
    const newConcludedState = e.target.checked;
    setConcluded(newConcludedState);
    if (onStatusChange) {
      onStatusChange(exercise.id, newConcludedState ? 'completed' : 'missed');
    }
    if (newConcludedState) {
      setMinimized(true);
    }
  };

  const handleNameClick = () => {
    if (!isCompleted) {
      setMinimized(!minimized);
    }
  };

  const handleMinimizedCardClick = () => {
    if (!isCompleted) {
      setMinimized(false);
    }
  };

  if (minimized) {
    return (
      <MinimizedExerciseCard
        exercise={exercise}
        concluded={concluded}
        onClick={handleMinimizedCardClick}
      />
    );
  }

  return (
    <StyledCard variant="elevated" size="medium" fullWidth $concluded={concluded}>
      <ExerciseHeader>
        <ExerciseName onClick={handleNameClick}>{exercise.name}</ExerciseName>
        <Tag variant={exercise.difficulty}>{exercise.difficulty}</Tag>
      </ExerciseHeader>

      <ExerciseDetails>
        <span>{exercise.sets} séries</span>
        <span>{exercise.reps} repetições</span>
        <span>{exercise.weight}kg</span>
      </ExerciseDetails>

      <ExerciseInputRow>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={concluded}
            onChange={handleConclude}
            disabled={isCompleted}
          />
          <CheckboxLabel>Concluído</CheckboxLabel>
        </CheckboxContainer>

        <RightGroup>
          <Input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Novo peso"
            size="small"
            disabled={isCompleted}
          />
          <Button
            variant="primary"
            size="small"
            onClick={handleCheck}
            disabled={isCompleted || newWeight.trim() === ''}
          >
            Atualizar
          </Button>
        </RightGroup>
      </ExerciseInputRow>
    </StyledCard>
  );
};

export default ExerciseCard; 