import React from 'react';
import NavBar from '~shared/components/nav-bar/navBar.component';
import { menuWrapper } from './dashboard.styles';
import {
	menuConfig,
	publicMenuConfig,
} from '~shared/components/nav-bar/menu.config';
import { container } from '~shared/styles/common-styles';
import { useAuthStore } from '~store/auth.store';

interface IDashboardLayout {
	children: React.ReactNode;
}

const DashboardLayout = ({
	children,
}: IDashboardLayout): React.ReactElement => {
	const { token } = useAuthStore();

	return (
		<div>
			<div className={menuWrapper}>
				<NavBar config={token ? menuConfig : publicMenuConfig} />
			</div>

			<div className={container}>{children}</div>
		</div>
	);
};

export default DashboardLayout;
