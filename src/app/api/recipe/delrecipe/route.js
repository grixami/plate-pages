import { CheckUserOwnsRecipe, DeleteRecipe } from "@/app/utils/prisma/utils/recipe";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const {recipeId} = await request.json()
        
        if(!recipeId) {
            return new Response(JSON.stringify({ error: "Recipe id not found" }), {
                status: 400
            })
        }

        const token = (await cookies()).get("token")?.value
        let userId

        try {
            const decoded = jwt.verify(token, jwtSecret)
            userId = decoded.userId
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid auth token" }), {
                status: 401
            })
        }

        const userOwnsRecipe = await CheckUserOwnsRecipe(userId, recipeId)

        if(!userOwnsRecipe) {
            return new Response(JSON.stringify({ error: "You do not own this recipe" }), {
                status: 403
            })
        }

        const delRecipe = await DeleteRecipe(recipeId)

        return new Response({status: 200})

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}