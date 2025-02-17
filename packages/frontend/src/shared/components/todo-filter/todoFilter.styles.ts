import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const filterWrapper = css`
	margin-bottom: ${THEME.PADDING.S};

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		margin-bottom: ${THEME.PADDING.M};
	}
`;

export const inputBox = css`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	gap: ${THEME.SPACING.MEDIUM};

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		flex-direction: row;
	}
`;

export const checkboxWrapper = css`
	display: flex;

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		margin-left: ${THEME.PADDING.M};
		align-items: center;
		gap: ${THEME.SPACING.MEDIUM};
	}
`;
