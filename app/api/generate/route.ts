import { cookies } from "next/headers";
import { refreshAccessToken } from "../refreshAccessToken";
import("next/headers");

async function validateAccessToken() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!accessToken && !refreshToken) {
        return new Response("Unauthorized", { status: 401 });
    }
    if (!accessToken) {
        const refreshAccessTokenRes = await refreshAccessToken();
        return refreshAccessTokenRes;
    }
    return new Response("Access token is valid", { status: 200 });
}

export async function POST() {
    const validateAccessTokenRes = await validateAccessToken();
    if (validateAccessTokenRes?.status !== 200) {
        return validateAccessTokenRes;
    }

    const TNP_API_SITE = process.env.TNP_API_SITE;
    if (!TNP_API_SITE) {
        return new Response("TNP_API_SITE environment variable is not set", { status: 500 });
    }
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const SHARE_URL = `${TNP_API_SITE}/share`;
    const res = await fetch(SHARE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
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
