import React from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../controllers/authController';
import { UseAuthDispatch } from '../../App';

const LogoutModal = () => {
	const authDispatch = UseAuthDispatch();
	return (
		<>
			<NavLink href='#' onClick={() => authDispatch(logout())}>
				Logout
			</NavLink>	
		</>

	);
}

export default LogoutModal