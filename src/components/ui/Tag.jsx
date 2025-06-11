import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const tagVariants = {
  beginner: css`
    background-color: ${props => props.theme.colors.success}22;
    color: ${props => props.theme.colors.success};
    border: 1px solid ${props => props.theme.colors.success}44;
  `,
  intermediate: css`
    background-color: ${props => props.theme.colors.warning}22;
    color: ${props => props.theme.colors.warning};
    border: 1px solid ${props => props.theme.colors.warning}44;
  `,
  advanced: css`
    background-color: ${props => props.theme.colors.error}22;
    color: ${props => props.theme.colors.error};
    border: 1px solid ${props => props.theme.colors.error}44;
  `,
  custom: css`
    background-color: ${props => props.theme.colors.primary}22;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary}44;
  `
};

const tagSizes = {
  small: css`
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: ${props => props.theme.fontSizes.xs};
  `,
  medium: css`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.sm};
  `,
  large: css`
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.md};
  `
};

const TagWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 500;
  white-space: nowrap;
  gap: ${props => props.theme.spacing.xs};

  ${props => tagVariants[props.$variant]}
  ${props => tagSizes[props.$size]}
`;

const Tag = ({ 
  children, 
  variant = 'custom', 
  size = 'medium',
  icon,
  ...props 
}) => {
  return (
    <TagWrapper $variant={variant} $size={size} {...props}>
      {icon}
      {children}
    </TagWrapper>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['beginner', 'intermediate', 'advanced', 'custom']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  icon: PropTypes.node
};

export default Tag; 