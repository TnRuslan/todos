import React, { useEffect } from 'react';
import NavBar from '~shared/components/nav-bar/navBar.component';
import { menuWrapper, rootWrapper } from './dashboard.styles';
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
	// const [isLoading, setIsLoading] = useState(false);
	// const [isError, setIsError] = useState(false);
	// const [data, setData] = useState(null);

	// const fetchData = async (): Promise<void> => {
	// 	setIsLoading(true);
	// 	try {
	// 		const response = await fetch(
	// 			'https://jsonplaceholder.typicode.com/users',
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error('Some Error');
	// 		}

	// 		const data = await response.json();
	// 		setData(data);
	// 	} catch (error) {
	// 		setIsError(true);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	// const axiosFetch = async (): Promise<void> => {
	// 	setIsLoading(true);
	// 	try {
	// 		const { data } = await axios.post(
	// 			'https://jsonplaceholder.typicode.com/users',
	// 			{ title: 'logo' },
	// 		);
	// 		setData(data);
	// 	} catch (error) {
	// 		console.log('my error', error.message);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	useEffect(() => {
		// fetchData();
		// axiosFetch();
	}, []);

	const { token } = useAuthStore();

	return (
		<div className={rootWrapper}>
			<div className={menuWrapper}>
				<NavBar config={token ? menuConfig : publicMenuConfig} />
			</div>

			<div className={container}>{children}</div>
		</div>
	);
};

export default DashboardLayout;
