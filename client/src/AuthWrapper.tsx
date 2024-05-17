'use client';

import React, { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<UserProvider>
			<body>{children}</body>
		</UserProvider>
	);
};

export default RootLayout;