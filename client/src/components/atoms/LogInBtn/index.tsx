import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import useConditionalAuth from '@/config/conditionalAuth';

const LoginButton = () => {
	const { loginWithRedirect } = useConditionalAuth();
	return <Button  variant="text" sx={{ color: 'white', fontFamily: 'monospace'}} onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;