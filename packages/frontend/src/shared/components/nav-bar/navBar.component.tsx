import React from 'react';
import { Link } from 'react-router-dom';
import { navBarStyles } from './navBar.styles';
import { linkStyles } from '~shared/styles/common-styles';

interface IConfig {
	path: string;
	title: string;
}

interface INavBar {
	config: IConfig[];
}

const NavBar = ({ config }: INavBar): React.ReactNode => {
	return (
		<nav className={navBarStyles}>
			{config.map((rout) => (
				<Link key={rout.path} to={rout.path} className={linkStyles}>
					{rout.title}
				</Link>
			))}
		</nav>
	);
};

export default NavBar;
