import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LogoutButton = () => {

	const { logout } = useAuth0();
	return <Button sx={{ color: 'white', fontFamily: 'monospace'}} variant="text" onClick={() => logout({ logoutParams: { returnTo: 'http://localhost:3000' } })}>
		Log out</Button>;
};

export default LogoutButton;