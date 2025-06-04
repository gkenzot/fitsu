import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useStorageContext } from '../contexts/StorageContext';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.background.card};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeText = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.5rem;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1rem;
  padding: ${props => props.theme.spacing.sm};
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.error};
  }
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.error};
  cursor: pointer;
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing.sm};
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const { user, logout } = useAuth();
  const { resetData } = useStorageContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      resetData();
      navigate('/dashboard');
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <WelcomeText>
          👋 Olá, {user?.name || 'Usuário'}
        </WelcomeText>
        <Actions>
          <ResetButton onClick={handleReset} title="Resetar Dados">
            🔄
          </ResetButton>
          {user && (
            <LogoutButton onClick={handleLogout}>
              Sair
            </LogoutButton>
          )}
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header; 