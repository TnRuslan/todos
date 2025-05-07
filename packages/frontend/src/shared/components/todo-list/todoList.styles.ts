import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const todoListStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.SPACING.MEDIUM};
	flex-wrap: wrap;
	justify-content: center;

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		gap: ${THEME.SPACING.LARGE};
		flex-direction: row;
	}
`;
