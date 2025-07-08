import { GetRecipeFromTitleQuery } from "@/app/utils/prisma/utils/recipe"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q")

        const recipes = await GetRecipeFromTitleQuery(query)
        return new Response(JSON.stringify(recipes))
    } catch(error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}