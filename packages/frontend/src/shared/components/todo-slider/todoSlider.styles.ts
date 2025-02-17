import { css } from '@emotion/css';

export const sliderStyles = css`
	width: 100%;
	height: 300px;
	margin: 0 auto;

	.swiper-wrapper {
		display: flex;
	}

	.swiper-slide {
		display: flex;
		align-items: center;
		justify-content: center;

		transition: transform 0.3s ease;

		&:hover {
			transform: scale(1.01);
		}
	}
`;
