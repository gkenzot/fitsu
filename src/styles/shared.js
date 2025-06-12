import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const hoverEffect = css`
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

export const cardBase = css`
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all 0.2s ease;
`;

export const textEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const disabledStyle = css`
  opacity: 0.6;
  cursor: not-allowed;
`; 