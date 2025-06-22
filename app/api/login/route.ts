import { cookies } from 'next/headers'
import { setCookies } from '../setCookies';

function validateUsernameAndPassword(username: string, password: string): boolean {
    return typeof username === 'string' && typeof password === 'string' && username.length >= 3 && password.length >= 5;
}

export async function POST(request: Request) {
    const { username, password } = await request.json();
    if (!validateUsernameAndPassword(username, password)) {
        return new Response("Invalid username or password", { status: 400 });
    }
    const TNP_API_SITE = process.env.TNP_API_SITE;
    if (!TNP_API_SITE) {
        return new Response("TNP_API_SITE environment variable is not set", { status: 500 });
    }
    const url = `${TNP_API_SITE}/login`;
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
    try{
        setCookies(cookieStore, data.accessToken, data.refreshToken);
    }catch (error) {
        console.error("Error setting cookies:", error);
        return new Response("Failed to log in", { status: 500 });
    }

    return new Response("Login successful", { status: 200 });
}
