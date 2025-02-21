import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const iconButtonStyles = css`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${THEME.PADDING.XS} ${THEME.PADDING.S};
	margin-left: auto;
	margin-right: auto;
	margin-bottom: ${THEME.PADDING.S};

	background-color: ${THEME.COLORS.primaryBtn};
	color: ${THEME.COLORS.primaryText};
	font-size: ${THEME.FONT_SIZES.MEDIUM};
	font-weight: bold;
	border: none;
	border-radius: ${THEME.BORDER_RADIUS.S};
	cursor: pointer;
	transition:
		background-color 0.3s ease,
		transform 0.2s ease;

	&:hover {
		background-color: ${THEME.COLORS.secondaryBtn};
	}

	&:active {
		background-color: ${THEME.COLORS.activeBtn};
		transform: scale(0.98);
	}

	&:disabled {
		background-color: ${THEME.COLORS.disabledBtn};
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
