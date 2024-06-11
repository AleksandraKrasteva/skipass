// import { useAuth0 } from '@auth0/auth0-react';



// export const UseAuthComponents = () => {
// 	const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect  } = useAuth0();

// 	const getMetadata = async()=>{
// 		if (!isAuthenticated) {
// 			return;
// 		}
// 		const userDetailsByIdUrl: string = `https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/users/${user?.sub}`;
// 		const token = await getAccessTokenSilently({
// 			authorizationParams: {
// 				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
// 				scope: 'read:current_user',
// 			}});

// 		const metadata =  await fetch(userDetailsByIdUrl, {
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});
	
// 		return await metadata.json();
// 	};

// 	return (
// 		getMetadata()
// 	);

// };

