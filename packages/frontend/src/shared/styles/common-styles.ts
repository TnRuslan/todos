import { css } from '@emotion/css';
import { colors } from './colors';
import { THEME } from './theme';

export const errorMessageStyle = css`
	color: ${THEME.COLORS.error};
`;

export const container = css`
	display: block;
	align-items: center;
	padding: ${THEME.PADDING.S};
	margin-right: auto;
	margin-left: auto;

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		padding: ${THEME.PADDING.M};
	}
`;

export const primaryBtn = css`
	width: 100%;
	padding: ${THEME.PADDING.XS} ${THEME.PADDING.S};
	background-color: ${THEME.COLORS.primaryBtn};
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
		font-size: ${THEME.FONT_SIZES.LARGE};
	}

	@media (min-width: ${THEME.BREAKPOINTS.DESKTOP}) {
		width: 300px;
	}
`;

export const dialogStyles = css`
	border-radius: ${THEME.BORDER_RADIUS.M};
	margin-left: ${THEME.PADDING.S};
	margin-right: ${THEME.PADDING.S};
`;

export const linkStyles = css`
	text-decoration: none;
	color: ${THEME.COLORS.primaryBtn};
	font-weight: bold;
	transition: color 0.3s ease;

	&:hover {
		color: ${THEME.COLORS.SECONDARY};
		text-decoration: none;
	}

	&:focus {
		outline: none;
	}
`;
