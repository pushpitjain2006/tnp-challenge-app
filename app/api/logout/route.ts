import { cookies } from "next/headers";

export async function GET() {
    const cookiesStore = await cookies();
    try {
        cookiesStore.delete("accessToken");
        cookiesStore.delete("refreshToken");
    } catch (error) {
        console.error("Error deleting cookies:", error);
        return new Response("Failed to log out", { status: 500 });
    }
    return new Response("Logged out successfully", { status: 200 });
}