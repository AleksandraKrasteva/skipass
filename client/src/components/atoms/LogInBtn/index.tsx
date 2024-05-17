import Button from '@mui/material/Button';
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();

const LoginButton = () => {
	// const { loginWithRedirect } = useAuth0();

	return <Button variant="outlined" onClick={() => {}}>Log In</Button>;
};

export default LoginButton;