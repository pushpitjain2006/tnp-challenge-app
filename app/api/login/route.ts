import { cookies } from 'next/headers'
import { setCookies } from '../setCookies';

export async function POST(request: Request) {
    const { username, password } = await request.json();
    if (!username || !password) {
        return new Response("Username and password are required", { status: 400 });
    }
    console.log("Attempting to log in with username:", username);
    console.log("Attempting to log in with password:", password);

    const url = "https://tnp-recruitment-challenge.manitvig.live/login";
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (res.status !== 200) {
        console.log("Login failed with status:", res.status);
        return new Response("Login failed", { status: 401 });
    }

    const data = await res.json();
    const cookieStore = await cookies();

    setCookies(cookieStore, data.accessToken, data.refreshToken);

    return new Response("Login successful", { status: 200 });
}
