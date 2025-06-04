import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background.main};
`;

const Main = styled.main`
  grid-area: main;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  padding-bottom: calc(${props => props.theme.spacing.md} + 80px); /* Adiciona espaço para o footer fixo */
`;

const BaseLayout = () => {
  const location = useLocation();
  console.log('Current route:', location.pathname);

  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </LayoutContainer>
  );
};

export default BaseLayout; 