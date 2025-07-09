import { GetUserAiTokens } from "@/app/utils/prisma/utils/user";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    try {
        const token = (await cookies()).get("token")?.value

        if(!token) {
            return new Response(JSON.stringify({ error: "" }), {
                status: 400
            })
        }

        let userId

        try {
            const decoded = jwt.verify(token, jwtSecret)
            userId = decoded.userId
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid auth token"}), {
                status: 401
            })
        }
        
        const count = await GetUserAiTokens(userId)

        return new Response(JSON.stringify({ count: count }))
    } catch {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}