import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaCheck, FaClock, FaTimes } from 'react-icons/fa';

const statusVariants = {
  completed: {
    background: 'rgba(46, 213, 115, 0.1)',
    color: '#2ed573',
    border: '1px solid rgba(46, 213, 115, 0.2)'
  },
  pending: {
    background: 'rgba(255, 171, 0, 0.1)',
    color: '#ffa502',
    border: '1px solid rgba(255, 171, 0, 0.2)'
  },
  missed: {
    background: 'rgba(255, 71, 87, 0.1)',
    color: '#ff4757',
    border: '1px solid rgba(255, 71, 87, 0.2)'
  }
};

const statusIcons = {
  completed: FaCheck,
  pending: FaClock,
  missed: FaTimes
};

const statusLabels = {
  completed: 'Concluído',
  pending: 'Pendente',
  missed: 'Faltou'
};

const StatusWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.9rem;
  font-weight: 500;
  ${props => statusVariants[props.$variant]}
`;

const Status = ({ variant = 'pending', showLabel = true }) => {
  const Icon = statusIcons[variant];
  const label = statusLabels[variant];

  return (
    <StatusWrapper $variant={variant}>
      <Icon size={14} />
      {showLabel && <span>{label}</span>}
    </StatusWrapper>
  );
};

Status.propTypes = {
  variant: PropTypes.oneOf(['completed', 'pending', 'missed']),
  showLabel: PropTypes.bool
};

export default Status; 