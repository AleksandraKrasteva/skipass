import Footer from '@/components/atoms/Footer';
import Navigation from '@/components/molecultes/Navigation';
import { Box } from '@mui/material';
import React from 'react';

const Contact = () => {
	return (
		<>
			<Navigation/>
			<Box sx={{mt:10}}>
				<div>If you want to complain - iamalittlebitch@email.com</div>
				<div>If you want to change your personal data - iamconfused@email.com</div>
				<div>If you want to delete your account with all personal data - oopsie@email.com</div>
			</Box>
			<Footer/>

		</>
	);
};

export default Contact;