import React, { FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  name: string;
  picture: string;
  email: string;
}

const Profile: FC = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const authUser: User = user; 

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<div>
				<img src={authUser!.picture } alt={authUser!.name} />
				<h2>{authUser!.name}</h2>
				<p>{authUser!.email}</p>
			</div>
		)
	);
};

export default Profile;