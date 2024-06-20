import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';

const UserProfile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && user && (
			<Box sx={{mt:10}}>
				<img src={user!.picture} />
				<h2>{user!.name}</h2>
				<p>{user!.email}</p>
				<p>{user!.nickname}</p>
				<p>{user!.profile}</p>
			</Box>
		)
	);
};

export default UserProfile;