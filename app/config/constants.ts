export const BASE_URL =
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ||
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
	process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
		? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
		: 'http://localhost:3000';
