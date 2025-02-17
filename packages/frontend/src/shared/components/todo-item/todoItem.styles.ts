import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const todoBox = css`
	width: 100%;
	padding: ${THEME.PADDING.S};
	border-radius: ${THEME.BORDER_RADIUS.S};
	display: flex;
	flex-direction: column;
	gap: ${THEME.SPACING.SMALL};

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

	width: 100%;
`;

export const todoDescription = css`
	word-break: break-all;
	white-space: normal;
	margin: 0;
`;
