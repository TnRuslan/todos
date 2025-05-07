import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const navBarStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${THEME.SPACING.SMALL};

	font-size: ${THEME.FONT_SIZES.MEDIUM};

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		gap: ${THEME.SPACING.MEDIUM};

		font-size: ${THEME.FONT_SIZES.LARGE};
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		gap: ${THEME.SPACING.LARGE};
	}
`;
