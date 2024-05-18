// import { handleAuth } from '@auth0/nextjs-auth0';

// export const GET = handleAuth();

// // pages/api/auth/[...auth0].ts
// export const runtime = 'edge';

import { NextApiRequest, NextApiResponse } from 'next';
import { handleAuth } from '@auth0/nextjs-auth0';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	try {
		switch (req.method) {
		case 'GET':
			await handleAuth()(req, res);
			break;
			// Handle other methods and cases if necessary
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		res.status(500).json({ error: 'Authentication Error', details: error.message });
	}
}
