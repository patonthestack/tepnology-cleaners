export const BASE_URL =
	process.env.VERCEL_ENV === 'production' ||
	process.env.VERCEL_ENV === 'preview' ||
	process.env.VERCEL_ENV === 'development'
		? `https://${process.env.VERCEL_URL}`
		: 'http://localhost:3000';
