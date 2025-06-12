import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background.main};

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-areas:
      "navbar header"
      "navbar main"
      "navbar footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
  }
`;

const Main = styled.main`
  grid-area: main;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  padding-bottom: calc(${props => props.theme.spacing.md} + 80px); /* Espaço para o footer fixo em mobile */

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    padding: ${props => props.theme.spacing.sm};
    padding-bottom: calc(${props => props.theme.spacing.sm} + 80px);
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    padding-bottom: ${props => props.theme.spacing.md};
  }
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: ${props => props.theme.colors.background.card};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @media (max-width: ${props => props.theme.breakpoints.small}) {
    padding: ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.xs};
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    position: static;
  }
`;

const BaseLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Navbar />
      <Footer>
        © {new Date().getFullYear()} Fitsu. Todos os direitos reservados.
      </Footer>
    </LayoutContainer>
  );
};

export default BaseLayout; 