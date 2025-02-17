import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';
import { colors } from '~shared/styles';

export const iconButtonStyles = css`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${THEME.PADDING.XS} ${THEME.PADDING.S};
	margin-left: auto;
	margin-right: auto;
	margin-bottom: ${THEME.PADDING.S};

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
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		width: 300px;
		margin-bottom: ${THEME.PADDING.M};
	}
`;
