
import { CreateRecipe } from "@/app/utils/prisma/utils/recipe"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const token = (await cookies()).get("token")?.value
        const { recipeDetails } = await request.json() // TODO

        if(!token || !recipeDetails) {
            return new Response(JSON.stringify({ error: "Missing auth token or paramaters"}), {
                status: 400
            })
        }

        let userId

        try {
            const decoded = jwt.verify(token, jwtSecret)
            userId = decoded.userId
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid token"}, {
                status: 401
            }))
        }

        const recipe = await CreateRecipe(recipeDetails.title, recipeDetails.description, recipeDetails.ingredients, recipeDetails.instructions, parseInt(recipeDetails.cooktime), userId, true)
        return new Response(JSON.stringify({ id: recipe.id }))
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}