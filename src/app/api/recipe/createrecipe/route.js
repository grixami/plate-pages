import { CreateRecipe } from "@/app/utils/prisma/utils/recipe"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const {title, desc, ingredients, instructions, time} = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!title || !desc || !ingredients || !instructions || !time || !token) {
            return new Response(JSON.stringify({ error: "Missing a parameter or authentication token" }), {
                status: 400
            })
        }
        
        let decoded

        try {
            decoded = jwt.verify(token, jwtSecret)
        } catch(error) {
            console.log(error)
            return new Response(JSON.stringify({ error: "Invalid auth token, please logout and then log back in" }), {
                status: 401
            })
        }

        const recipe = await CreateRecipe(time.toString(), desc.toString(), ingredients, instructions, parseInt(time), decoded.userId)

        return new Response(JSON.stringify({ id: recipe.id }), {
            status: 201
        })
        
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }))
    }
}