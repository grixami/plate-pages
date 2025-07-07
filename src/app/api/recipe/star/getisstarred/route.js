import { GetIsStarred } from "@/app/utils/prisma/utils/recipe"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        const token = (await cookies()).get("token")?.value

        if(!id || !token) {
            return new Response(JSON.stringify({ error: "id or token not found" }), {
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

        const isStarred = await GetIsStarred(userId, parseInt(id))

        return new Response(JSON.stringify({ starred: isStarred }), {
            status: 200
        })
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}