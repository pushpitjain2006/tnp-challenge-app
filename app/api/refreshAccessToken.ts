import { cookies } from 'next/headers';
import { setCookies } from './setCookies';

export async function refreshAccessToken() {
    const cookiesStore = await cookies();
    const refreshToken = cookiesStore.get("refreshToken")?.value;
    if (!refreshToken) {
        return new Response("Unauthorized", { status: 401 });
    }
    const REFRESH_URL = "https://tnp-recruitment-challenge.manitvig.live/refresh";
    const res = await fetch(REFRESH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });
    if (res.status !== 200) {
        return new Response("Unauthorized", { status: 401 });
    }
    const tokens = await res.json();
    setCookies(cookiesStore, tokens.accessToken, tokens.refreshToken);
    return new Response("Tokens refreshed successfully", { status: 200 });
}