export default async function serverFetch(path: string, options = {}) {
	const baseUrl =
		`https://${process.env.VERCEL_URL}` || 'http://localhost:3000';
	const url = new URL(path, baseUrl);
	return fetch(url.toString(), options);
}
