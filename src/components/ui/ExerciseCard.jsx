import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { Tag } from './';

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
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: none;
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
  ${props => props.$concluded && `
    border-left: 4px solid ${props.theme.colors.success};
  `}
`;

const StyledCard = styled(Card)`
  transition: all 0.2s ease;
  box-shadow: none;
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  &:hover {
    transform: translateY(-2px);
  }
  ${props => props.$concluded && `
    border-left: 4px solid ${props.theme.colors.success};
  `}
`;

const ExerciseSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    <StyledCard variant="default" size="small" fullWidth $concluded={concluded}>
      <ExerciseHeader>
        <ExerciseName onClick={handleNameClick}>{exercise.name}</ExerciseName>
        <ExerciseDetails>
          <span>{exercise.sets} séries</span>
          <span>{exercise.reps} repetições</span>
          <span>{exercise.weight}kg</span>
          {exercise.level && (
            <Tag variant={exercise.level} size="small">
              {exercise.level}
            </Tag>
          )}
        </ExerciseDetails>
      </ExerciseHeader>

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
            style={{ width: '100px' }}
          />
          <Button
            variant="primary"
            size="small"
            onClick={handleCheck}
            disabled={!newWeight.trim()}
          >
            Atualizar
          </Button>
        </RightGroup>
      </ExerciseInputRow>
    </StyledCard>
  );
};

export default ExerciseCard; 