import styled from 'styled-components';
import { useState } from 'react';

const NovoTreinoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
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
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.background.card};
  color: ${props => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ExerciseCard = styled.div`
  background-color: ${props => props.theme.colors.background.card};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NovoTreino = () => {
  const [exercicios, setExercicios] = useState([]);
  const [novoExercicio, setNovoExercicio] = useState({
    nome: '',
    series: '',
    repeticoes: '',
    peso: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setExercicios([...exercicios, novoExercicio]);
    setNovoExercicio({ nome: '', series: '', repeticoes: '', peso: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoExercicio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <NovoTreinoContainer>
      <Title>Novo Treino</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome do Exercício</Label>
          <Input
            type="text"
            name="nome"
            value={novoExercicio.nome}
            onChange={handleChange}
            placeholder="Ex: Supino Reto"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Séries</Label>
          <Input
            type="number"
            name="series"
            value={novoExercicio.series}
            onChange={handleChange}
            placeholder="Ex: 4"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Repetições</Label>
          <Input
            type="text"
            name="repeticoes"
            value={novoExercicio.repeticoes}
            onChange={handleChange}
            placeholder="Ex: 12"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Peso (kg)</Label>
          <Input
            type="text"
            name="peso"
            value={novoExercicio.peso}
            onChange={handleChange}
            placeholder="Ex: 60"
            required
          />
        </FormGroup>

        <Button type="submit">Adicionar Exercício</Button>
      </Form>

      <ExerciseList>
        {exercicios.map((exercicio, index) => (
          <ExerciseCard key={index}>
            <div>
              <h3>{exercicio.nome}</h3>
              <p>{exercicio.series}x{exercicio.repeticoes} - {exercicio.peso}kg</p>
            </div>
          </ExerciseCard>
        ))}
      </ExerciseList>
    </NovoTreinoContainer>
  );
};

export default NovoTreino; 