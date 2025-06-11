import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStorageContext } from '../../contexts/StorageContext';
import { FaBolt } from 'react-icons/fa';
import { IoRefresh } from 'react-icons/io5';

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

  svg {
    font-size: 1.8rem;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const WelcomeMessage = styled.span`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
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

  svg {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const LoginButton = styled(Link)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const RegisterButton = styled(Link)`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  border: 2px solid ${props => props.theme.colors.primary};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { resetData } = useStorageContext();

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os dados?')) {
      resetData();
    }
  };

  return (
    <HeaderContainer>
      <Nav>
        <NavContent>
          <Logo to="/">
            <FaBolt />
            Fitsu
          </Logo>
          <UserSection>
            {isAuthenticated ? (
              <>
                <WelcomeMessage>
                  {user?.name || 'Usuário'}
                </WelcomeMessage>
                <ResetButton onClick={handleReset} title="Resetar dados">
                  <IoRefresh />
                </ResetButton>
              </>
            ) : (
              <ButtonGroup>
                <LoginButton to="/login">
                  Entrar
                </LoginButton>
                <RegisterButton to="/cadastro">
                  Cadastrar
                </RegisterButton>
              </ButtonGroup>
            )}
          </UserSection>
        </NavContent>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 