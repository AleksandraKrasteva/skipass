import { sendRequest } from '@/api/test';
import Navigation from '@/components/molecultes/Navigation';
import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

const index = () => {

	const [response, setResponse] = useState(''); 

	const displaySomething = async() => {
		const res = await sendRequest();
		setResponse(res.data.content);
	};
	
	return (
		<>
			<Navigation/>
			<Button sx={{mt: 40}} onClick={()=>displaySomething()}>Click me</Button>
			<Typography
				variant="h6"
				noWrap
				sx={{
					ml: 4,
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
				}}
			>{response}</Typography>
		</>
	);
};

export default index;
