import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const dashboardTitle = css`
	margin-bottom: ${THEME.PADDING.XS};
	color: ${THEME.COLORS.TEXT};
	text-transform: uppercase;
	font-size: ${THEME.FONT_SIZES.LARGE};

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		margin-bottom: ${THEME.PADDING.S};
		font-size: ${THEME.FONT_SIZES.XL};
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		margin-bottom: ${THEME.PADDING.M};
	}
`;

export const dashboardWrapper = css`
	text-align: center;
`;

export const paginationContainer = css`
	margin-top: ${THEME.PADDING.S};
`;
