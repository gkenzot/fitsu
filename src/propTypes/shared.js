import PropTypes from 'prop-types';
import { COMPONENT_VARIANTS, COMPONENT_SIZES, STATUS_VARIANTS } from '../constants/variants';

export const commonProps = {
  variant: PropTypes.oneOf(COMPONENT_VARIANTS),
  size: PropTypes.oneOf(COMPONENT_SIZES),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

export const statusProps = {
  variant: PropTypes.oneOf(STATUS_VARIANTS),
  showLabel: PropTypes.bool
};

export const cardProps = {
  ...commonProps,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  footer: PropTypes.node,
  alignFooter: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'space-around'])
};

export const buttonProps = {
  ...commonProps,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export const inputProps = {
  ...commonProps,
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string
}; 