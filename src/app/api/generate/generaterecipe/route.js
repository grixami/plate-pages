import { GenerateRecipe } from "@/app/utils/openai/generaterecipe"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const token = (await cookies()).get("token")?.value
        let { desc, allergies, time} = await request.json()

        if(!token || !desc || !time) {
            return new Response(JSON.stringify({ error: "Missing a token or paramater" }), {
                status: 400
            })
        }

        if(!allergies) {
            allergies = "none"
        }

        let userId

        try {
            const decoded = jwt.verify(token, jwtSecret)
            userId = decoded.userId //TODO, add max generations per user
        } catch(error) {
            return new Response(JSON.stringify({ error: "Token auth failed" }), {
                status: 401
            })
        }

        const recipe = await GenerateRecipe(desc, allergies, time)

        return new Response(JSON.stringify(recipe), {
            status: 200
        })
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }) ,{
            status: 500 
        })
    }
}