import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Card } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background.primary};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
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

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.md};
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  margin-top: ${props => props.theme.spacing.md};
`;

const TestCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  margin-top: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background.secondary};
  border: 1px dashed ${props => props.theme.colors.border};
`;

const TestTitle = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 1rem;
  text-align: center;
`;

const TestCredentials = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const TestButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.success};
  
  &:hover {
    background-color: ${props => props.theme.colors.successDark};
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
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
      const success = login(formData.email, formData.password);
      
      if (!success) {
        setErrors(prev => ({
          ...prev,
          form: 'Email ou senha inválidos'
        }));
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Ocorreu um erro ao fazer login'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setErrors({});
    try {
      await login('user@example.com', '123456');
      navigate('/dashboard');
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        form: 'Erro ao fazer login com usuário de teste'
      }));
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Login</Title>
        <Subtitle>
          Ou{' '}
          <Link to="/cadastro">
            crie uma nova conta
          </Link>
        </Subtitle>
        
        <Form onSubmit={handleSubmit}>
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
          />

          {errors.form && (
            <ErrorMessage>{errors.form}</ErrorMessage>
          )}

          <FormFooter>
            <RememberMe>
              <input
                type="checkbox"
                id="remember-me"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember-me">
                Lembrar-me
              </label>
            </RememberMe>

            <Link to="/esqueci-senha">
              Esqueceu sua senha?
            </Link>
          </FormFooter>

          <Button 
            type="submit" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
      </LoginCard>

      <TestCard>
        <TestTitle>Usuário de Teste</TestTitle>
        <TestCredentials>
          <div>Email: user@example.com</div>
          <div>Senha: 123456</div>
        </TestCredentials>
        <TestButton onClick={handleTestLogin}>
          Entrar com Usuário de Teste
        </TestButton>
      </TestCard>
    </LoginContainer>
  );
};

export default Login; 