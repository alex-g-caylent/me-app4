import { getCookie as getCookieClient } from "cookies-next";
import { isServer } from "./environment";

/**
 * Isomorphic cookie getter works both on server & client (components)
 */
export const getCookie = async (name: string) => {
    if (isServer) {
        const { cookies } = await import("next/headers");
		const cookieStore = await cookies();
		return cookieStore.get("jwt")?.value;
    }

    return getCookieClient(name);
}