import RootLayout from '@/AuthWrapper';
import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

interface NoSSRWrapperProps {
  children: ReactNode;
}

const NoSSRWrapper: React.FC<NoSSRWrapperProps> = (props) => (
	<React.Fragment>
		<RootLayout>{props.children}</RootLayout>
	</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
	ssr: false
});