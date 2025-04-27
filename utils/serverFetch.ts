import { BASE_URL } from '@/app/config/constants';

export default async function serverFetch(path: string, options = {}) {
	const baseUrl = BASE_URL;
	const url = new URL(path, baseUrl);
	return fetch(url.toString(), options);
}
