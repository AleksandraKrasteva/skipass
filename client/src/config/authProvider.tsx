/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Auth0ContextInterface } from '@auth0/auth0-react';

interface Auth0User {
  name: string;
  email: string;
  nickname:string;
}

interface Auth0ProviderProps {
  children: ReactNode;
}

const Auth0Context = createContext<Partial<Auth0ContextInterface>>({});

export const useTestAuth0 = () => useContext(Auth0Context);

const MockAuth0Provider = ({ children }: Auth0ProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<Auth0User>();

	const loginWithRedirect = async () => {
		setIsAuthenticated(true);
		setUser({ name: 'Test User', email: 'test@example.com', nickname:'testuser' });
	};

	const getAccessTokenSilently = async () =>{
		return 'token token';
	};

	return (
		<Auth0Context.Provider 
		// @ts-ignore
			value={{ isAuthenticated, user, loginWithRedirect, getAccessTokenSilently }}>
			{children}
		</Auth0Context.Provider>
	);
};

export { MockAuth0Provider };