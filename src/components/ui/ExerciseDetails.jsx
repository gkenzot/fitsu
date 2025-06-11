import styled from 'styled-components';
import Card from './Card';

const ExerciseDetailsContainer = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ExerciseTitle = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const Muscle = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.85rem;
  font-weight: normal;
`;

const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'iniciante':
      return '#4CAF50'; // Verde
    case 'intermediário':
      return '#FFA726'; // Laranja
    case 'avançado':
      return '#EF5350'; // Vermelho
    default:
      return '#9E9E9E'; // Cinza
  }
};

const DifficultyBadge = styled.span`
  background-color: ${props => getDifficultyColor(props.difficulty)};
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ExerciseDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 0.85rem;
  line-height: 1.3;
`;

const ExerciseStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xs};
  background-color: ${props => props.theme.colors.background.secondary};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.75rem;
  margin-bottom: 2px;
`;

const StatValue = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 0.9rem;
`;

const ExerciseDetails = ({ exercise }) => {
  if (!exercise) return null;

  return (
    <ExerciseDetailsContainer>
      <ExerciseHeader>
        <ExerciseTitle>
          {exercise.name || 'Exercício'}
          {exercise.muscle && <Muscle>({exercise.muscle})</Muscle>}
        </ExerciseTitle>
        <DifficultyBadge difficulty={exercise.difficulty}>
          {exercise.difficulty || 'Não definida'}
        </DifficultyBadge>
      </ExerciseHeader>

      {exercise.description && (
        <ExerciseDescription>{exercise.description}</ExerciseDescription>
      )}
      
      <ExerciseStats>
        <StatItem>
          <StatLabel>Séries</StatLabel>
          <StatValue>{exercise.sets || '-'}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Repetições</StatLabel>
          <StatValue>{exercise.reps || '-'}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Peso</StatLabel>
          <StatValue>{exercise.weight ? `${exercise.weight}kg` : '-'}</StatValue>
        </StatItem>
      </ExerciseStats>
    </ExerciseDetailsContainer>
  );
};

export default ExerciseDetails; 