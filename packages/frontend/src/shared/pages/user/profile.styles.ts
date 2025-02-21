import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const titleStyles = css`
	text-align: center;
	margin-bottom: ${THEME.PADDING.M};
	text-transform: uppercase;
	color: ${THEME.COLORS.primaryText};
`;

export const profileWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${THEME.SPACING.LARGE};
	padding: ${THEME.SPACING.LARGE};

	margin-left: auto;
	margin-right: auto;
	max-width: 500px;

	background-color: ${THEME.COLORS.secondaryBgColor};
	border: 2px solid ${THEME.COLORS.borderColor};
	border-radius: ${THEME.BORDER_RADIUS.S};
`;
