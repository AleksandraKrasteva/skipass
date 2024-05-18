/* eslint-disable no-mixed-spaces-and-tabs */
// import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Auth0Provider } from '@auth0/auth0-react';

import type { AppProps } from 'next/app';

export default function App(props: AppProps) {
	const { Component, pageProps } = props;
	return (
		<Auth0Provider domain="dev-hxsl4k6mw7xspicu.eu.auth0.com" clientId="pZ5kS27dqX4zxH3xzTF1Q18qz7dTLrrJ" authorizationParams={{
			redirect_uri: 'https://auth0.skipass.pages.dev/api/auth/callback'
	 	  }}
	  >
			<Component {...pageProps} />
		</Auth0Provider>
	);
}