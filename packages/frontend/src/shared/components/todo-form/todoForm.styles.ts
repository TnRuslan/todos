import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';
import { colors } from '~shared/styles';

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

export const submitBtn = css`
	width: 100%;
	padding: ${THEME.PADDING.XS} ${THEME.PADDING.S};
	background-color: ${colors.primaryBtn};
	color: ${colors.white};
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	font-weight: bold;
	border: none;
	border-radius: ${THEME.BORDER_RADIUS.S};
	cursor: pointer;

	transition:
		background-color 0.3s ease,
		transform 0.2s ease;

	&:hover {
		background-color: ${colors.darkPrimaryBtn};
	}

	&:active {
		background-color: ${colors.darkBlue};
		transform: scale(0.98);
	}

	&:disabled {
		background-color: ${colors.disabledBtnColor};
		cursor: not-allowed;
	}

	@media (min-width: ${THEME.BREAKPOINTS.TABLET}) {
		width: 200px;
		font-size: ${THEME.FONT_SIZES.LARGE};
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		width: 300px;
	}
`;
