import { GetStarredRecipes } from "@/app/utils/prisma/utils/recipe"
import { GetPrivacySetting } from "@/app/utils/prisma/utils/user"

export async function GET(request) {
    try {
        const { searchParams} = new URL(request.url)
        const id = searchParams.get("id")

        if(!id) {
            return new Response(JSON.stringify({ error: "Id not found in query" }))
        }
        
        const isPrivate = await GetPrivacySetting(parseInt(id))

        if(isPrivate) {
            return new Response(JSON.stringify({ error: "Users profile is private"}), {
                status: 403
            })
        }

        const favs = await GetStarredRecipes(parseInt(id))
        return new Response(JSON.stringify(favs))
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}