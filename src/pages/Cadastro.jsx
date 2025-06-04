import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button } from '../components/ui';

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

const Cadastro = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de cadastro aqui
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
              placeholder="Seu nome completo"
              required
              fullWidth
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Seu email"
              required
              fullWidth
            />
            
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="Sua senha"
              required
              fullWidth
            />
            
            <Input
              label="Confirmar senha"
              type="password"
              name="confirm-password"
              placeholder="Confirme sua senha"
              required
              fullWidth
            />

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

            <Button type="submit" fullWidth>
              Criar conta
            </Button>
          </Form>
        </FormContainer>
      </Main>
    </CadastroContainer>
  );
};

export default Cadastro; 