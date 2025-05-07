import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const todoBox = css`
  width: 100%;
  padding: ${THEME.PADDING.S};
  border-radius: ${THEME.BORDER_RADIUS.S};
  display: flex;
  flex-direction: column;
  gap: ${THEME.SPACING.LARGE};

  color: ${THEME.COLORS.primaryText};
  background-color: ${THEME.COLORS.secondaryBgColor};
  box-shadow: 0 0 10px rgba(139, 181, 243, 0.4);

  @media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
    width: 80%;
  }

  @media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
    width: 320px;
    margin-bottom: ${THEME.PADDING.M};
    gap: ${THEME.SPACING.MEDIUM};
  }
`;

export const todoButtonsBox = css`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const todoDescription = css`
  word-break: break-all;
  white-space: normal;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
