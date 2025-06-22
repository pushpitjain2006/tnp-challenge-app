import { cookies } from "next/headers";
import { setCookies } from "../setCookies";
import { refreshAccessToken } from "../refreshAccessToken";
import("next/headers");

// Define the SHARE_URL constant with the appropriate URL
// Define the REFRESH_URL constant with the appropriate URL

export async function POST() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!accessToken && !refreshToken) {
        return new Response("Unauthorized", { status: 401 });
    }
    if (!accessToken) {
        await refreshAccessToken();
        if (!cookieStore.get("accessToken")?.value) {
            return new Response("Unauthorized", { status: 401 });
        }
    }

    const SHARE_URL = "https://tnp-recruitment-challenge.manitvig.live/share";
    const res = await fetch(SHARE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`,
        },
    });
    if (res.status !== 200) {
        return new Response("Failed to share", { status: res.status });
    }
    const data = await res.json();
    const shareToken = data.shareToken;
    return new Response(JSON.stringify({ shareToken }), {
        status: 200
    });
}
