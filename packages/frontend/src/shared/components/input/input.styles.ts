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
		border: 2px solid ${THEME.COLORS.BORDER};
		border-radius: ${THEME.BORDER_RADIUS.S};
		font-size: ${THEME.FONT_SIZES.MEDIUM};
		height: ${size}px;

		transition: border-color 0.3s ease;

		&:focus {
			outline: none;
			border-color: ${colors.primaryBtn};
			box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
		}

		&:hover {
			border-color: ${colors.dimGray};
		}
	`;
};
