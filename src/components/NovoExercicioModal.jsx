import { useState } from 'react';
import styled from 'styled-components';
import { HiX } from 'react-icons/hi';
import { Card } from '../components/ui';
import Select from 'react-select';
import exercises from '../data/exercises.json';

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
  padding: ${props => props.theme.spacing.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
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
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.sm};

  &:hover {
    background-color: ${props => props.theme.colors.background.hover};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
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

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--background-card)',
    borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
    borderWidth: '1px',
    borderRadius: 'var(--border-radius-sm)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--primary)'
    },
    minHeight: '38px'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--background-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--border-radius-sm)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    marginTop: '4px'
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: 'var(--background-card)',
    padding: '4px 0'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'var(--background-hover)' : 'var(--background-card)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    padding: '8px 12px',
    '&:active': {
      backgroundColor: 'var(--background-hover)'
    }
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--text-primary)',
    margin: '0'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-primary)'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--text-secondary)'
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'var(--text-secondary)',
    '&:hover': {
      color: 'var(--text-primary)'
    }
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: 'var(--text-secondary)',
    '&:hover': {
      color: 'var(--text-primary)'
    }
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: 'var(--border)'
  })
};

const NovoExercicioModal = ({ isOpen, onClose, onAddExercise, selectedDay }) => {
  const [newExercise, setNewExercise] = useState({
    exerciseId: '',
    name: '',
    sets: '',
    reps: '',
    weight: '',
    notes: ''
  });

  const exerciseOptions = exercises.exercises.map(exercise => ({
    value: exercise.id,
    label: exercise.name
  }));

  const handleExerciseSelect = (selectedOption) => {
    const selectedExercise = exercises.exercises.find(e => e.id === selectedOption.value);
    setNewExercise(prev => ({
      ...prev,
      exerciseId: selectedExercise.id,
      name: selectedExercise.name
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExercise(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExercise(selectedDay, {
      exerciseId: newExercise.exerciseId,
      sets: newExercise.sets,
      reps: newExercise.reps,
      weight: newExercise.weight,
      notes: newExercise.notes
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Adicionar Exercício</ModalTitle>
          <CloseButton onClick={onClose}>
            <HiX size={24} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Exercício</Label>
            <Select
              options={exerciseOptions}
              onChange={handleExerciseSelect}
              styles={customStyles}
              placeholder="Selecione um exercício"
              isClearable
            />
          </FormGroup>

          <FormGroup>
            <Label>Séries</Label>
            <Input
              type="number"
              name="sets"
              value={newExercise.sets}
              onChange={handleInputChange}
              placeholder="Número de séries"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Repetições</Label>
            <Input
              type="number"
              name="reps"
              value={newExercise.reps}
              onChange={handleInputChange}
              placeholder="Número de repetições"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Peso (kg)</Label>
            <Input
              type="number"
              name="weight"
              value={newExercise.weight}
              onChange={handleInputChange}
              placeholder="Peso em kg"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Observações</Label>
            <TextArea
              name="notes"
              value={newExercise.notes}
              onChange={handleInputChange}
              placeholder="Adicione observações sobre o exercício"
            />
          </FormGroup>

          <Button type="submit">Adicionar Exercício</Button>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default NovoExercicioModal; 