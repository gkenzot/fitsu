import styled from 'styled-components';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { useState, useEffect } from 'react';

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  transition: opacity 0.2s;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  ${props => props.concluded && `
    border-left: 4px solid ${props.theme.colors.success};
  `}
`;

const StyledCard = styled(Card)`
  position: relative;
  ${props => props.concluded && `
    border-left: 4px solid ${props.theme.colors.success};
  `}
`;

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
      onStatusChange(exercise.id, newConcludedState ? 'completed' : 'pending');
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
      <MinimizedCard 
        variant="elevated" 
        size="medium" 
        fullWidth 
        concluded={concluded}
        onClick={handleMinimizedCardClick}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ExerciseName>{exercise.name}</ExerciseName>
          <span>{exercise.sets} x {exercise.reps} {exercise.weight}kg</span>
        </div>
      </MinimizedCard>
    );
  }

  return (
    <StyledCard variant="elevated" size="medium" fullWidth concluded={concluded}>
      <ExerciseHeader>
        <ExerciseName onClick={handleNameClick}>{exercise.name}</ExerciseName>
        <ExerciseDetails>
          <span>{exercise.sets} séries</span>
          <span>{exercise.reps} repetições</span>
          <span>{exercise.weight}kg</span>
        </ExerciseDetails>
      </ExerciseHeader>
      <ExerciseInputRow>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id={`exercise-${exercise.id}`}
            checked={concluded}
            onChange={handleConclude}
            disabled={isCompleted}
          />
          <CheckboxLabel htmlFor={`exercise-${exercise.id}`}>
            Concluído
          </CheckboxLabel>
        </CheckboxContainer>
        <RightGroup>
          <Input
            type="number"
            placeholder="Novo peso (kg)"
            value={newWeight}
            onChange={e => setNewWeight(e.target.value)}
            size="small"
            style={{ maxWidth: 100 }}
            disabled={isCompleted}
          />
          <Button size="small" onClick={handleCheck} disabled={isCompleted}>
            ✓
          </Button>
        </RightGroup>
      </ExerciseInputRow>
    </StyledCard>
  );
};

export default ExerciseCard; 