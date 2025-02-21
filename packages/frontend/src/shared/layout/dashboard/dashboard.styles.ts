import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const rootWrapper = css`
	background-color: ${THEME.COLORS.primaryBgColor};
	height: 100vh;
`;

export const menuWrapper = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${THEME.PADDING.XS};
	background-color: ${THEME.COLORS.secondaryBgColor};
	border-bottom-color: ${THEME.COLORS.borderColor};
	border-bottom-width: 2;
	border-style: solid;

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		padding-bottom: ${THEME.PADDING.S};
		padding-top: ${THEME.PADDING.S};
		padding-left: ${THEME.PADDING.M};
		padding-right: ${THEME.PADDING.M};
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		padding-left: ${THEME.PADDING.L};
		padding-right: ${THEME.PADDING.L};
	}
`;
