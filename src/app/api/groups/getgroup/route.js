import { GetGroupDetails } from "@/app/utils/prisma/utils/groups"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        const groups = await GetGroupDetails(parseInt(id))
        return new Response(JSON.stringify(groups))
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}