import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';


const Footer = () => {
	const router = useRouter();

	return (
		<BottomNavigation
			sx={{marginTop: 'calc(10% + 60px)',
				width: '100%',
				position: 'fixed',
				bottom: 0,
				
			}}
			showLabels
		>
			<BottomNavigationAction sx={{
				fontFamily: 'monospace',
				fontSize: 20,
				fontWeight: 250,
				letterSpacing: '.1rem',
				color: 'teal',
			}} onClick={()=>{router.push('/contact');}} label="Contact & Complains & Requests"/>
		</BottomNavigation>
	);
};

export default Footer;