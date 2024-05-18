import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button onClick={() => logout({ logoutParams: { returnTo: 'https://auth0.skipass.pages.dev' } })}>
      Log Out
		</Button>
	);
};

export default LogoutButton;