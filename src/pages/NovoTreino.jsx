import styled from 'styled-components';
import { useState } from 'react';
import { Card, Modal, Button } from '../components/ui';
import { HiPlus } from 'react-icons/hi';
import NovoExercicioModal from '../components/NovoExercicioModal';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../contexts/StorageContext';

const NovoTreinoContainer = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const WorkoutInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.background.card};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background.main};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const DayCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DayTitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  margin: 0;
`;

const DayNameInput = styled.input`
  width: 70%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExerciseCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExerciseName = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const ExerciseDetails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const ExerciseNotes = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  margin: ${props => props.theme.spacing.sm} 0 0;
`;

const AddExerciseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.background.hover};
  color: ${props => props.theme.colors.text.primary};
  border: 1px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background.card};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const AddWorkoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const diasDaSemana = [
  { id: 'monday', name: 'Segunda-feira' },
  { id: 'tuesday', name: 'Terça-feira' },
  { id: 'wednesday', name: 'Quarta-feira' },
  { id: 'thursday', name: 'Quinta-feira' },
  { id: 'friday', name: 'Sexta-feira' },
  { id: 'saturday', name: 'Sábado' },
  { id: 'sunday', name: 'Domingo' }
];

const NovoTreino = () => {
  const navigate = useNavigate();
  const { data, updateData } = useStorageContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [workoutData, setWorkoutData] = useState({
    name: '',
    monday: { name: '', exercises: [] },
    tuesday: { name: '', exercises: [] },
    wednesday: { name: '', exercises: [] },
    thursday: { name: '', exercises: [] },
    friday: { name: '', exercises: [] },
    saturday: { name: '', exercises: [] },
    sunday: { name: '', exercises: [] }
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  const handleWorkoutInfoChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayNameChange = (dayId, value) => {
    setWorkoutData(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        name: value
      }
    }));
  };

  const handleAddExercise = (dayId) => {
    setSelectedDay(dayId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmitExercise = (dayId, exercise) => {
    setWorkoutData(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        exercises: [...prev[dayId].exercises, exercise]
      }
    }));
  };

  const handleAddWorkout = () => {
    if (!workoutData.name) {
      alert('Por favor, insira o nome do treino.');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmAddWorkout = () => {
    // Desativar treino atual se existir
    const updatedWorkouts = data.workouts.map(workout => ({
      ...workout,
      status: 'inactive'
    }));

    // Encontrar o próximo ID disponível
    const nextId = data.workouts.length > 0 
      ? Math.max(...data.workouts.map(w => parseInt(w.id))) + 1 
      : 1;

    // Filtrar apenas os dias que possuem exercícios
    const schedule = Object.entries(workoutData)
      .filter(([key, value]) => 
        key !== 'name' && // Excluir o campo 'name' do workoutData
        Array.isArray(value.exercises) && 
        value.exercises.length > 0
      )
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: {
          id: key === 'monday' ? 1 :
               key === 'tuesday' ? 2 :
               key === 'wednesday' ? 3 :
               key === 'thursday' ? 4 :
               key === 'friday' ? 5 :
               key === 'saturday' ? 6 :
               key === 'sunday' ? 7 : 1,
          name: value.name,
          exercises: value.exercises.map(exercise => ({
            exerciseId: parseInt(exercise.exerciseId), // Garantindo que exerciseId seja número
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            notes: exercise.notes || ''
          }))
        }
      }), {});

    // Criar novo treino
    const newWorkout = {
      id: nextId.toString(),
      name: workoutData.name,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      schedule
    };

    // Atualizar dados
    updateData({
      ...data,
      workouts: [...updatedWorkouts, newWorkout]
    });

    // Fechar modal e navegar para página semanal
    setShowConfirmModal(false);
    navigate('/app/semana');
  };

  return (
    <NovoTreinoContainer>
      <Title>Novo Treino</Title>

      <WorkoutInfo>
        <InfoGroup>
          <Label>Nome do Treino</Label>
          <Input
            type="text"
            name="name"
            value={workoutData.name}
            onChange={handleWorkoutInfoChange}
            placeholder="Digite o nome do treino"
            required
          />
        </InfoGroup>
      </WorkoutInfo>

      <WeekGrid>
        {diasDaSemana.map(({ id, name }) => (
          <DayCard key={id}>
            <DayHeader>
              <DayNameInput
                placeholder="Nome do treino (ex: Peito e Tríceps)"
                value={workoutData[id].name}
                onChange={(e) => handleDayNameChange(id, e.target.value)}
              />
              <DayTitle>{name}</DayTitle>
            </DayHeader>
            
            <ExerciseList>
              {workoutData[id].exercises.map((exercise, index) => (
                <ExerciseCard key={index}>
                  <ExerciseHeader>
                    <ExerciseName>{exercise.name}</ExerciseName>
                  </ExerciseHeader>
                  <ExerciseDetails>
                    <span>{exercise.sets} séries</span>
                    <span>{exercise.reps} repetições</span>
                    <span>{exercise.weight}kg</span>
                  </ExerciseDetails>
                  {exercise.notes && (
                    <ExerciseNotes>{exercise.notes}</ExerciseNotes>
                  )}
                </ExerciseCard>
              ))}
            </ExerciseList>

            <AddExerciseButton onClick={() => handleAddExercise(id)}>
              <HiPlus size={20} />
              Adicionar Exercício
            </AddExerciseButton>
          </DayCard>
        ))}
      </WeekGrid>

      <AddWorkoutButton onClick={handleAddWorkout}>
        <HiPlus size={20} />
        Adicionar Treino
      </AddWorkoutButton>

      <NovoExercicioModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onAddExercise={handleSubmitExercise}
        selectedDay={selectedDay}
      />

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar Novo Treino"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmAddWorkout}
            >
              Confirmar
            </Button>
          </>
        }
      >
        <div>
          <p>Tem certeza que deseja adicionar este treino?</p>
          <p>O treino atual será desativado e este novo treino será definido como ativo.</p>
        </div>
      </Modal>
    </NovoTreinoContainer>
  );
};

export default NovoTreino; 
