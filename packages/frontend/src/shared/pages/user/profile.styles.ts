import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const titleStyles = css`
	text-align: center;
	margin-bottom: ${THEME.PADDING.M};
	text-transform: uppercase;
`;

export const profileWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${THEME.SPACING.LARGE};
`;
