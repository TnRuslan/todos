import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const menuWrapper = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${THEME.PADDING.XS};

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		padding-top: ${THEME.PADDING.S};
		padding-left: ${THEME.PADDING.M};
		padding-right: ${THEME.PADDING.M};
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		padding-left: ${THEME.PADDING.L};
		padding-right: ${THEME.PADDING.L};
	}
`;
