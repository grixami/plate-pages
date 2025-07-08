import { ToggleStar } from "@/app/utils/prisma/utils/recipe"
import { cookies } from "next/headers"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const { id } = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!id || !token) {
            return new Response(JSON.stringify({ error: "Missing id or auth token"}), {
                status: 400
            })
        }

        let userId

        try {
            const decoded = jwt.verify(token, jwtSecret)
            userId = decoded.userId
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid auth token" }), {
                status: 401
            })
        }

        let star = await ToggleStar(userId, parseInt(id))
        
        return new Response({ status: 200 })
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}