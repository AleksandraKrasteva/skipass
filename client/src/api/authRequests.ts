// import { useAuth0 } from '@auth0/auth0-react';



// const Authentication = () =>{

// 	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

// 	export const getAccessToken = async()=>{
// 		if (!isAuthenticated) {
// 			return;
// 		}

// 		const token = await getAccessTokenSilently({
// 			authorizationParams: {
// 				audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
// 				scope: 'read:current_user',
// 			}});
// 		//set it somewhere
// 		return token; 
// 	};

// 	export const getMetadata = async()=>{
// 		if (!isAuthenticated) {
// 			return;
// 		}
// 		const userDetailsByIdUrl: string = `https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/users/${user?.sub}`;

// 		const metadata =  await fetch(userDetailsByIdUrl, {
// 			headers: {
// 				Authorization: `Bearer ${getAccessToken()}`,
// 			},
// 		});

// 		return await metadata.json();
// 	};
// };