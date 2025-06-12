import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaChartLine, FaCalendarAlt, FaDumbbell, FaHistory, FaUser } from 'react-icons/fa';

const NavbarContainer = styled.footer`
  grid-area: footer;
  background-color: ${props => props.theme.colors.background.card};
  border-top: 1px solid ${props => props.theme.colors.border};
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} 0;
  max-width: 600px;
  margin: 0 auto;
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

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
          </StyledLink>
        ))}
      </NavContainer>
    </NavbarContainer>
  );
};

export default Navbar; 