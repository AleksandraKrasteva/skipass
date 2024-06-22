/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import Button from '@mui/material/Button';
import useConditionalAuth from '@/config/conditionalAuth';

const LoginButton = () => {
	const { loginWithRedirect } = useConditionalAuth();
	// @ts-ignore

	return <Button  variant="text" sx={{ color: 'white', fontFamily: 'monospace'}} onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;