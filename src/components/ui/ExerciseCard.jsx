import styled from 'styled-components';
import Card from './Card';
import Input from './Input';
import Button from './Button';
import { useState } from 'react';

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
`;

const ExerciseDetails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.95rem;
`;

const ExerciseInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
`;

const RightGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
`;

const MinimizedCard = styled(Card)`
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const ExerciseCard = ({ exercise, onUpdateWeight }) => {
  const [newWeight, setNewWeight] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [concluded, setConcluded] = useState(false);

  const handleCheck = () => {
    if (newWeight.trim() !== '') {
      onUpdateWeight(exercise.id, parseFloat(newWeight));
      setNewWeight('');
    }
  };

  const handleConclude = () => {
    setConcluded(true);
    setMinimized(true);
  };

  if (minimized) {
    return (
      <MinimizedCard variant="elevated" size="medium" fullWidth onClick={() => setMinimized(false)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{exercise.name}</span>
          <span>{exercise.sets} x {exercise.reps} {exercise.weight}kg</span>
        </div>
      </MinimizedCard>
    );
  }

  return (
    <Card variant="elevated" size="medium" fullWidth>
      <ExerciseHeader>
        <ExerciseName>{exercise.name}</ExerciseName>
        <ExerciseDetails>
          <span>{exercise.sets} séries</span>
          <span>{exercise.reps} repetições</span>
          <span>{exercise.weight}kg</span>
        </ExerciseDetails>
      </ExerciseHeader>
      <ExerciseInputRow>
        <Button size="small" variant="secondary" onClick={handleConclude}>
          Concluir
        </Button>
        <RightGroup>
          <Input
            type="number"
            placeholder="Novo peso (kg)"
            value={newWeight}
            onChange={e => setNewWeight(e.target.value)}
            size="small"
            style={{ maxWidth: 100 }}
          />
          <Button size="small" onClick={handleCheck}>
            ✓
          </Button>
        </RightGroup>
      </ExerciseInputRow>
    </Card>
  );
};

export default ExerciseCard; 