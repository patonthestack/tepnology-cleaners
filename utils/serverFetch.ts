import { BASE_URL } from '@/app/config/constants';
export default async function serverFetch(path: string, options = {}) {
	const url = new URL(path, BASE_URL);
	return fetch(url.toString(), options);
}
