import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaChartLine, FaCalendarAlt, FaDumbbell, FaHistory, FaUser } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  grid-area: navbar;
  background-color: ${props => props.theme.colors.background.card};
  border-top: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    position: static;
    border-top: none;
    border-right: 1px solid ${props => props.theme.colors.border};
    box-shadow: none;
    height: 100%;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: ${props => props.theme.spacing.lg};
    max-width: none;
    gap: ${props => props.theme.spacing.md};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text.secondary};
  transition: color 0.2s ease;
  padding: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.xs};

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    flex-direction: row;
    width: 100%;
    font-size: ${props => props.theme.fontSizes.md};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    background-color: ${props => props.$isActive ? props.theme.colors.background.elevated : 'transparent'};

    &:hover {
      background-color: ${props => props.theme.colors.background.elevated};
    }
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    margin-right: ${props => props.theme.spacing.md};
  }
`;

const NavLabel = styled.span`
  display: none;

  &.desktop-only {
    @media (min-width: ${props => props.theme.breakpoints.desktop}) {
      display: block;
    }
  }
`;

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/app/dashboard', icon: <FaChartLine />, label: 'Dashboard' },
    { path: '/app/semana', icon: <FaCalendarAlt />, label: 'Semana' },
    { path: '/app/treino', icon: <FaDumbbell />, label: 'Treino' },
    { path: '/app/historico', icon: <FaHistory />, label: 'Histórico' },
    { path: '/app/perfil', icon: <FaUser />, label: 'Perfil' }
  ];

  return (
    <NavbarContainer>
      <NavContainer>
        {navItems.map((item) => (
          <StyledLink 
            key={item.path} 
            to={item.path}
            $isActive={location.pathname === item.path}
            title={item.label}
          >
            <IconWrapper>{item.icon}</IconWrapper>
            <NavLabel className="desktop-only">{item.label}</NavLabel>
          </StyledLink>
        ))}
      </NavContainer>
    </NavbarContainer>
  );
};

export default Navbar; 