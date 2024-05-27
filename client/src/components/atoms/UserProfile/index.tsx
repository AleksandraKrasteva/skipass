/* eslint-disable */
// @ts-ignore
import React, { useEffect, useState } from 'react';
import { useAuth0,  } from '@auth0/auth0-react';
// import { getMetadata } from '@/api/authRequests';

// interface UserMetadata {
// // @ts-ignore
//   [key: string]: json;
// }


const Profile  = () => {
	const { user, isAuthenticated, getAccessTokenSilently  } = useAuth0();
	/* eslint-disable */

	const [userMetadata, setUserMetadata] = useState<any>(null);
	// const [token, setToken] = useState<string>('');

	const getAccessToken = async()=>{
		if (!isAuthenticated) {
			return;
		}
	
		const token = await getAccessTokenSilently({
			authorizationParams: {
				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
				scope: 'read:current_user',
			}});
		//set it somewhere
		return token; 
	};
	
	const getMetadata = async()=>{
		if (!isAuthenticated) {
			return;
		}
		const userDetailsByIdUrl: string = `https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/users/${user?.sub}`;
	
		const metadata =  await fetch(userDetailsByIdUrl, {
			headers: {
				Authorization: `Bearer ${await getAccessToken()}`,
			},
		});
	
		return await metadata.json();
	};

	const configureMetadata = async()=>{
		setUserMetadata(await getMetadata());

	};

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// const authUser:User = user; 


	useEffect(() => {
		configureMetadata(); 
		// if (!isAuthenticated) return;  
		// getUserMetadata();
	}, [user]);
	

	return (
		isAuthenticated && (
			<div>
				{userMetadata ? (
					<>
						{/* @ts-ignore */}
						<img src={userMetadata.picture} alt={userMetadata.name} />
						<h2>{userMetadata.name}</h2>
						<p>{userMetadata.email}</p>
						<p>{userMetadata.identities[0].user_id}</p>
						{/* <h3>User Metadata</h3> */}
					</>
				):(
					'LogIn'
				)}
				{/* {userMetadata ? (
					<pre>{JSON.stringify(userMetadata, null, 2)}</pre>
				) : (
					'No user metadata defined'
				)} */}
			</div>
		)
	);
};

export default Profile;