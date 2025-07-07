import { CheckUserOwnsRecipe, UpdateRecipe } from "@/app/utils/prisma/utils/recipe"
import { cookies } from "next/headers"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const { id, title, desc, ingredients, instructions, time } = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!id || !title || !desc || !ingredients || !instructions || !time || !token) {
            return new Response(JSON.stringify({ error: "Missing a parameter" }), {
                status: 400
            })
        }

        let userId

        try {
            const decoded = jwt.verify(token, jwtSecret)
            userId = decoded.userId
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401
            })
        }

        const userOwnsRecipe = await CheckUserOwnsRecipe(userId, parseInt(id))

        if(!userOwnsRecipe) {
            return new Response(JSON.stringify({ error: "You are not the creator of this recipe" }), {
                status: 403
            })
        }

        const editRecipe = await UpdateRecipe(parseInt(id), title, desc, JSON.stringify(ingredients), JSON.stringify(instructions), parseInt(time))
        return new Response(JSON.stringify({ id: id }), {status: 200})
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}