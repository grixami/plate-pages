import { GetRecipe } from "@/app/utils/prisma/utils/recipe"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = parseInt(searchParams.get("id"))

        const post = await GetRecipe(id)

        return new Response(JSON.stringify(post), {
            status: 200
        })
    } catch(error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}