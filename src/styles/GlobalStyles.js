import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background.main};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Elementos de texto */
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text.primary};
    font-family: ${props => props.theme.fonts.heading};
    line-height: 1.2;
    margin: 0;
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: 1rem;
  }

  /* Links */
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }

  /* Botões */
  button {
    cursor: pointer;
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.primary};
    border: none;
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    transition: background-color 0.2s ease;
    font-family: inherit;

    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Inputs */
  input, textarea, select {
    background-color: ${props => props.theme.colors.background.card};
    color: ${props => props.theme.colors.text.primary};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    padding: ${props => props.theme.spacing.sm};
    transition: border-color 0.2s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }

    &::placeholder {
      color: ${props => props.theme.colors.text.disabled};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Listas */
  ul, ol {
    list-style: none;
  }

  /* Imagens */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export default GlobalStyles; 