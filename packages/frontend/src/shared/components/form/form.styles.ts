import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const FormWrapper = css`
	border-radius: ${THEME.BORDER_RADIUS.M};
	max-width: 700px;
	margin-right: auto;
	margin-left: auto;
`;

export const formStyles = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${THEME.SPACING.MEDIUM};

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		gap: ${THEME.SPACING.LARGE};
	}
`;
