import styled, { css } from 'styled-components';

const inputVariants = {
  default: css`
    background-color: ${props => props.theme.colors.background.card};
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text.primary};

    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }
  `,
  error: css`
    background-color: ${props => props.theme.colors.background.card};
    border: 1px solid ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.text.primary};

    &:focus {
      border-color: ${props => props.theme.colors.error};
    }
  `,
};

const inputSizes = {
  small: css`
    padding: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.sm};
  `,
  medium: css`
    padding: ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.md};
  `,
  large: css`
    padding: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.lg};
  `,
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.colors.text.disabled};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => inputVariants[props.variant]}
  ${props => inputSizes[props.size]}
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Input = ({
  label,
  error,
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput
        variant={error ? 'error' : variant}
        size={size}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input; 