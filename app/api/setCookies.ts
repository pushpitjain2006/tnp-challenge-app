export async function setCookies(cookieStore: any, accessToken: string, refreshToken: string) {
    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 15 * 60, // 15 mins
    });
    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hr
    });
}