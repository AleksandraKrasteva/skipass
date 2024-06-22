import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const UserProfile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && user && (
			<Box sx={{mt: 10, mb:2, border: 1, width:250, borderColor: 'pink', borderRadius: '16px',  px:2, pb:2, pt:2}} >
				<Typography
					sx={{
						fontFamily: 'monospace',
						fontSize: 20,
						fontWeight: 700,
						letterSpacing: '.2rem',
						color: 'teal',
					}}>Profile:</Typography>
			
				<img src={user!.picture} />
				<Typography
					sx={{
						fontFamily: 'monospace',
						fontSize: 16,
						fontWeight: 700,
						letterSpacing: '.2rem',
						color: 'black',
					}}>{user!.nickname}</Typography>
				<p>Email: {user!.email}</p>
			</Box>
		)
	);
};

export default UserProfile;