import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useStorageContext } from '../../contexts/StorageContext';
import { IoRefresh } from 'react-icons/io5';
import fitsuIcon from '../../assets/FitsuIcon064.svg';

const HeaderContainer = styled.header`
  grid-area: header;
  background-color: ${props => props.theme.colors.background.elevated};
  box-shadow: ${props => props.theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    height: 56px;
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  img {
    width: 2rem;
    height: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    font-size: 1.2rem;
    gap: 0.25rem;

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: 1.8rem;

    img {
      width: 2.5rem;
      height: 2.5rem;
    }
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

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    font-size: ${props => props.theme.fontSizes.xs};
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: ${props => props.theme.fontSizes.md};
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

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    font-size: 1rem;
    padding: ${props => props.theme.spacing.xs};

    svg {
      font-size: 1rem;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    font-size: 1.4rem;

    svg {
      font-size: 1.4rem;
    }
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
  font-size: ${props => props.theme.fontSizes.sm};

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
  font-size: ${props => props.theme.fontSizes.sm};

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
            <img src={fitsuIcon} alt="Fitsu Logo" />
            Fitsu
          </Logo>
          <UserSection>
            {isAuthenticated ? (
              <WelcomeMessage>
                {user?.name || 'Usuário'}
              </WelcomeMessage>
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