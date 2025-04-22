import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const titleStyles = (color = THEME.COLORS.primaryText, size = 20) => {
  return css`
    color: ${color};
    font-size: ${size};
    text-transform: uppercase;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};
