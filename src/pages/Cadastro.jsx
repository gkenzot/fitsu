import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button } from '../components/ui';
import { useState } from 'react';
import { useStorageContext } from '../contexts/StorageContext';

const CadastroContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: bold;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.secondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.md};
`;

const TermsText = styled.label`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.4;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.text.error};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.xs};
`;

const Cadastro = () => {
  const navigate = useNavigate();
  const { data, updateData } = useStorageContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Verificar se o email já está em uso
      if (data?.user?.email === formData.email) {
        setErrors(prev => ({
          ...prev,
          email: 'Este email já está em uso'
        }));
        return;
      }

      // Criar nova estrutura de dados para o usuário
      const newData = {
        user: {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          height: 0,
          weight: 0,
          age: 0,
          gender: '',
          address: {
            street: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: ''
          },
          cpf: '',
          phone: ''
        },
        workouts: [],
        workoutHistory: []
      };

      // Limpar dados existentes e salvar nova estrutura
      localStorage.removeItem('fitsu_user');
      localStorage.removeItem('fitsu_data');
      localStorage.setItem('fitsu_data', JSON.stringify(newData));
      localStorage.setItem('fitsu_user', JSON.stringify(newData.user));

      // Redirecionar para o dashboard
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Ocorreu um erro ao criar sua conta'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CadastroContainer>
      <Main>
        <FormContainer>
          <Title>Crie sua conta</Title>
          <Subtitle>
            Ou{' '}
            <Link to="/login">
              faça login se já tiver uma conta
            </Link>
          </Subtitle>
          
          <Form onSubmit={handleSubmit}>
            <Input
              label="Nome completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              error={errors.name}
              required
              fullWidth
              autoComplete="name"
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Seu email"
              error={errors.email}
              required
              fullWidth
              autoComplete="email"
            />
            
            <Input
              label="Senha"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Sua senha"
              error={errors.password}
              required
              fullWidth
              autoComplete="new-password"
            />
            
            <Input
              label="Confirmar senha"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              error={errors.confirmPassword}
              required
              fullWidth
              autoComplete="new-password"
            />

            {errors.form && (
              <ErrorMessage>{errors.form}</ErrorMessage>
            )}

            <TermsContainer>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
              />
              <TermsText htmlFor="terms">
                Eu concordo com os{' '}
                <Link to="/termos">Termos de Uso</Link>
                {' '}e{' '}
                <Link to="/privacidade">Política de Privacidade</Link>
              </TermsText>
            </TermsContainer>

            <Button 
              type="submit" 
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </Form>
        </FormContainer>
      </Main>
    </CadastroContainer>
  );
};

export default Cadastro; 