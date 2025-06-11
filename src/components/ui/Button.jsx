import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const buttonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text.primary};

    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background.main};

    &:hover {
      background-color: ${props => props.theme.colors.secondaryDark};
    }
  `,
  outline: css`
    background-color: transparent;
    border: 2px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};

    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.text.primary};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  `,
  danger: css`
    background-color: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.text.primary};

    &:hover {
      background-color: ${props => props.theme.colors.error}dd;
    }
  `,
};

const buttonSizes = {
  small: css`
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.sm};
  `,
  medium: css`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.md};
  `,
  large: css`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.lg};
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => buttonVariants[props.variant]}
  ${props => buttonSizes[props.size]}
`;

/**
 * Componente Button reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {string} props.variant - Variante do botão (primary, secondary, outline, text)
 * @param {string} props.size - Tamanho do botão (small, medium, large)
 * @param {boolean} props.fullWidth - Se o botão deve ocupar toda a largura disponível
 * @returns {JSX.Element} Componente Button
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
};

export default Button; 