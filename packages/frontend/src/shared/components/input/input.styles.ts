import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';
import { colors } from '~shared/styles';

export const inputWrapperStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${THEME.SPACING.SMALL};
	width: 100%;
`;

export const textInputStyles = (size = 40): string => {
	return css`
		padding: ${THEME.PADDING.XS};
		border: 2px solid ${THEME.COLORS.borderColor};
		border-radius: ${THEME.BORDER_RADIUS.S};
		font-size: ${THEME.FONT_SIZES.MEDIUM};
		height: ${size}px;

		background-color: ${THEME.COLORS.secondaryBgColor};
		transition: border-color 0.3s ease;
		color: ${THEME.COLORS.primaryText};

		&:focus {
			outline: none;
			border-color: rgb(77, 133, 179);
			box-shadow: 0 0 10px rgba(54, 111, 196, 0.5);
		}

		&:hover {
			border-color: ${colors.dimGray};
		}

		&::placeholder {
			color: ${THEME.COLORS.disabledText};
		}
	`;
};
