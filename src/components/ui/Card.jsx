import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const cardVariants = {
  default: css`
    background-color: ${props => props.theme.colors.background.card};
    border: 1px solid ${props => props.theme.colors.border};
  `,
  elevated: css`
    background-color: ${props => props.theme.colors.background.card};
    box-shadow: ${props => props.theme.shadows.lg};
    border: none;
  `,
  outlined: css`
    background-color: transparent;
    border: 2px solid ${props => props.theme.colors.border};
  `,
};

const cardSizes = {
  small: css`
    padding: ${props => props.theme.spacing.md};
  `,
  medium: css`
    padding: ${props => props.theme.spacing.lg};
  `,
  large: css`
    padding: ${props => props.theme.spacing.xl};
  `,
};

const CardWrapper = styled.div`
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all 0.2s ease;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  ${props => cardVariants[props.$variant]}
  ${props => cardSizes[props.$size]}
`;

const CardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.fontSizes.lg};
  margin: 0;
`;

const CardSubtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
  margin: ${props => props.theme.spacing.xs} 0 0 0;
`;

const CardContent = styled.div`
  color: ${props => props.theme.colors.text.primary};
`;

const CardFooter = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: ${props => props.alignFooter || 'flex-end'};
  gap: ${props => props.theme.spacing.sm};
`;

const Card = ({
  title,
  subtitle,
  children,
  footer,
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  alignFooter,
  ...props
}) => {
  const cardId = `card-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <CardWrapper
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      role="article"
      aria-labelledby={title ? `${cardId}-title` : undefined}
      {...props}
    >
      {(title || subtitle) && (
        <CardHeader>
          {title && (
            <CardTitle id={`${cardId}-title`}>
              {title}
            </CardTitle>
          )}
          {subtitle && (
            <CardSubtitle>
              {subtitle}
            </CardSubtitle>
          )}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter alignFooter={alignFooter}>
          {footer}
        </CardFooter>
      )}
    </CardWrapper>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  alignFooter: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'space-around']),
};

export default Card; 