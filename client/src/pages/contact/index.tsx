import Footer from '@/components/atoms/Footer';
import Navigation from '@/components/molecultes/Navigation';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Contact = () => {
	return (
		<>
			<Navigation/>
			<Box sx={{mt:10}}>
				<Typography
					sx={{
						ml: 4,
						fontFamily: 'monospace',
						fontSize: 24,
						fontWeight: 800,
						letterSpacing: '.1rem',
						color: 'teal',
					}}
				> Contact
				</Typography>
				<Box sx={{mt:2, border: 1, borderColor: 'pink', borderRadius: '16px', borderWidth:2, width:500, px:4, pb:4, pt:2}} >
					<Typography
						sx={{
							fontFamily: 'monospace',
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: '.1rem',
							color: 'black',
						}}
					> Incorrect personal information
					</Typography>
					<div>Is any of your information incorrect, or out of date? You can contact us to update it at: 
						<Typography
							sx={{
								fontFamily: 'monospace',
								fontSize: 14,
								fontWeight: 800,
								letterSpacing: '.1rem',
								color: 'teal',
							}}
						> incorrect_info@skipass.email.com
						</Typography></div>
				</Box>
				<Box sx={{mt:2, border: 1, borderColor: 'pink', borderRadius: '16px', borderWidth:2, width:500, px:4, pb:4, pt:2}} >
					<Typography
						sx={{
							fontFamily: 'monospace',
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: '.1rem',
							color: 'black',
						}}
					> Request account deletion
					</Typography>
					<div>Are you longer using your account, and you want to delete all your stored data, then you can contact us at:
						<Typography
							sx={{
								fontFamily: 'monospace',
								fontSize: 14,
								fontWeight: 800,
								letterSpacing: '.1rem',
								color: 'teal',
							}}
						> terminate_account@skipass.email.com
						</Typography></div>	
				</Box>
				<Box sx={{mt:2, border: 1, borderColor: 'pink', borderRadius: '16px', borderWidth:2, width:500, px:4, pb:4, pt:2}} >
					<Typography
						sx={{
							fontFamily: 'monospace',
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: '.1rem',
							color: 'black',
						}}
					> Complains and requests
					</Typography>
					<div>Do you have any complaints or concerns about how your data is being stored, then you can contact us at:
						<Typography
							sx={{
								fontFamily: 'monospace',
								fontSize: 14,
								fontWeight: 800,
								letterSpacing: '.1rem',
								color: 'teal',
							}}
						> concerns@skipass.email.com
						</Typography></div>	

				</Box>
			</Box>
			<Footer/>

		</>
	);
};

export default Contact;