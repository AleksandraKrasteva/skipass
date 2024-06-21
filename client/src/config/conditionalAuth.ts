import { useTestAuth0 } from '@/config/authProvider';
import { useAuth0 } from '@auth0/auth0-react';

const useConditionalAuth = () => {
	if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'test') {
		return useTestAuth0();
	} else {
		return useAuth0();
	}
};

export default useConditionalAuth;
