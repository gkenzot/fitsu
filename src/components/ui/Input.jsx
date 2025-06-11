import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const inputVariants = {
  default: css`
    background-color: ${props => props.theme.colors.background.card};
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text.primary};

    &:focus {
      border-color: ${props => props.theme.colors.primary};
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
    }
  `,
  error: css`
    background-color: ${props => props.theme.colors.background.card};
    border: 1px solid ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.text.primary};

    &:focus {
      border-color: ${props => props.theme.colors.error};
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.error}33;
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
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
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
    background-color: ${props => props.theme.colors.background.disabled};
  }

  ${props => inputVariants[props.$variant]}
  ${props => inputSizes[props.$size]}
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
  id,
  type,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Adiciona autocomplete para campos de senha
  const getAutocomplete = () => {
    if (type === 'password') {
      return props.name === 'password' ? 'new-password' : 'current-password';
    }
    return props.autoComplete;
  };

  return (
    <InputWrapper $fullWidth={fullWidth}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <StyledInput
        id={inputId}
        $variant={error ? 'error' : variant}
        $size={size}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        autoComplete={getAutocomplete()}
        type={type}
        {...props}
      />
      {error && (
        <ErrorMessage id={`${inputId}-error`} role="alert">
          {error}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input; 