import * as React from 'react';
import { iconButtonStyles } from './iconButton.styles';

interface IconButtonProps {
	onClick?: () => void;
	icon: React.ReactNode;
}

const IconButton = ({ icon, onClick }: IconButtonProps): React.ReactNode => {
	return (
		<button className={iconButtonStyles} type="button" onClick={onClick}>
			{icon}
		</button>
	);
};

export default IconButton;
