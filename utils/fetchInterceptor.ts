import { getCookie } from "./cookies";
import { toast } from 'react-toastify';
import { 
	ServerConnectionError,
	OfflineError,
	ServerError,
	ClientError
} from './api/errors'

const fetchInterceptor = async (url: string, options?: RequestInit) => {
	let res;
	let data;
	const { pathname } = new URL(url);
	const resource = pathname.replace(/\/$/, '').split('/').pop();

	try {
		const jwt = await getCookie("jwt");
		res = await fetch(url, {
			...options,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: jwt ? "Bearer " + jwt : '',
				...options?.headers
			},
		});
		data = await res.json();
	} catch (error) {
		console.error(`Fetch request failed ${url}`, error);
		throw new ServerConnectionError();
	}

	const status = res?.status;

	if (status >= 500) {
		console.error('500 error', data, res);
		throw new ServerError(res, data, pathname);
	}

	if (status >= 400) {
		throw new ClientError(res, data, pathname);
	}

	return data;
};

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
	const jwt = await getCookie("jwt");
	
	return fetch(`${process.env.NEXT_PUBLIC_APIBASE}${url}`, {
	  ...options,
	  headers: {
		"Content-Type": "application/json",
		Authorization: jwt ? "Bearer " + jwt : '',
		...options.headers
	  },
	});
  }

export const fetchApi = (url: string, options?: RequestInit) =>
	fetchInterceptor(`${process.env.NEXT_PUBLIC_APIBASE}${url}`, options);
