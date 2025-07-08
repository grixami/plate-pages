import { GetUserData } from "@/app/utils/prisma/utils/user"


export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        const userData = await GetUserData(parseInt(id))
        return new Response(JSON.stringify(userData))
    } catch(error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}