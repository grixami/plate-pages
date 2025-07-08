import { GetRecentRecipes } from "@/app/utils/prisma/utils/recipe"
import { RecentRecipeNumber } from "@/app/utils/setvalues"

export async function GET() {
    try {
        const recentRecipes = await GetRecentRecipes(RecentRecipeNumber)
        return new Response(JSON.stringify(recentRecipes))
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}