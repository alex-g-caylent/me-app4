export class ApiError extends Error {
	public status: number;
	public statusText: string;
	public body?: object | string;

	constructor(res: Response, data: object, pathname: string) {
		const { status, statusText } = res;
		super(`ApiError: ${status} ${statusText} fetching ${pathname}`);
		this.status = status;
		this.statusText = statusText;

		try {
			this.body = data;
		} catch (error) {}
	}
}
export class ClientError extends ApiError {}
export class ServerError extends ApiError {}
export class OfflineError extends Error {}
export class ServerConnectionError extends Error {}
