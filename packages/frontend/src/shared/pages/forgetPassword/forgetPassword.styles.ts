import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const formWrapper = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.SPACING.MEDIUM};

	min-width: 150px;
	align-items: center;

	background-color: ${THEME.COLORS.secondaryBgColor};
	border: 2px solid ${THEME.COLORS.borderColor};
	border-radius: ${THEME.BORDER_RADIUS.S};
`;
