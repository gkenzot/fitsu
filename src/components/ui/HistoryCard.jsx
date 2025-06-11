import styled from 'styled-components';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Card from './Card';
import { Status } from './';

const HistoryCardContainer = styled(Card)`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Date = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ExerciseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ExerciseItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} 0;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const ExerciseName = styled.span`
  color: ${props => props.theme.colors.text.primary};
`;

const ExerciseDetails = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const HistoryCard = ({ history, onClick }) => {
  const formattedDate = format(new Date(history.date), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR
  });

  return (
    <HistoryCardContainer
      variant="elevated"
      size="medium"
      fullWidth
      onClick={onClick}
    >
      <Header>
        <Date>{formattedDate}</Date>
        <Status variant={history.status} />
      </Header>
      <ExerciseList>
        {history.exercises.map((exercise, index) => (
          <ExerciseItem key={index}>
            <ExerciseName>{exercise.name}</ExerciseName>
            <ExerciseDetails>
              {exercise.sets}x{exercise.reps} {exercise.weight}kg
            </ExerciseDetails>
          </ExerciseItem>
        ))}
      </ExerciseList>
    </HistoryCardContainer>
  );
};

export default HistoryCard; 