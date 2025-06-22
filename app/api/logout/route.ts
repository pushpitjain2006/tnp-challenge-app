import { cookies } from "next/headers";

export async function GET() {
    const cookiesStore = await cookies();
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
    return new Response("Logged out successfully", { status: 200 });
}