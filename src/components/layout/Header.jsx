import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStorageContext } from '../../contexts/StorageContext';
import { Button } from '../ui';

const HeaderContainer = styled.header`
  grid-area: header;
  background-color: ${props => props.theme.colors.background.elevated};
  box-shadow: ${props => props.theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '⚡';
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const WelcomeMessage = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.2s ease;
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
  const { isAuthenticated, logout } = useAuth();
  const { data, resetData } = useStorageContext();

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      resetData();
    }
  };

  return (
    <HeaderContainer>
      <Nav>
        <NavContent>
          <Logo to="/">
            Fitsu
          </Logo>
          <NavLinks>
            <ResetButton onClick={handleReset} title="Resetar Dados">
              🔄
            </ResetButton>
            {isAuthenticated() ? (
              <>
                <WelcomeMessage>
                  Seja bem-vindo, {data?.user?.name || 'Usuário'}!
                </WelcomeMessage>
                <Button onClick={logout} variant="secondary">
                  Sair
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <Button as={Link} to="/cadastro" variant="secondary">
                  Cadastrar
                </Button>
              </>
            )}
          </NavLinks>
        </NavContent>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 