/* eslint-disable no-mixed-spaces-and-tabs */
// import { UserProvider } from '@auth0/nextjs-auth0/client';
'use';
import { Auth0Provider } from '@auth0/auth0-react';

import type { AppProps } from 'next/app';
import { MockAuth0Provider } from '../config/authProvider';

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const isTest = process.env.NEXT_PUBLIC_ENVIRONMENT === 'test';
	console.log(process.env.ENVIRONMENT);
	console.log(process.env.NEXT_PUBLIC_ENVIRONMENT);
	console.log(isTest);
	
	return (
		isTest ?
			<MockAuth0Provider>
				<Component {...pageProps} />
			</MockAuth0Provider>
			:
			<Auth0Provider domain="dev-hxsl4k6mw7xspicu.eu.auth0.com" 
				clientId="pZ5kS27dqX4zxH3xzTF1Q18qz7dTLrrJ" 
				// useRefreshTokens={true}
				authorizationParams={{
				// 				redirect_uri: 'https://skipass.pages.dev/',
					redirect_uri:'http://localhost:3000',
					// redirect_uri: 'https://auth0.skipass.pages.dev/'
					// redirect_uri: 'https://skipass.pages.dev/',
					audience: 'https://dev-hxsl4k6mw7xspicu.eu.auth0.com/api/v2/',
					scope: 'openid profile email read:current_user update:current_user_metadata'
	 	    }}
	  >
				<Component {...pageProps} />
			</Auth0Provider>

	);
}