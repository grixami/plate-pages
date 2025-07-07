import { SetEmail } from "@/app/utils/prisma/utils/settings"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const { email } = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!email || !token) {
            return new Response(JSON.stringify({ error: "Missing email or auth token" }), {
                status: 400
            })
        }

        let decoded

        try {
            decoded = jwt.verify(token, jwtSecret)
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid token" }), {
                status: 401
            })
        }

        const userId = decoded.userId
        const user = await SetEmail(userId, email)

        return new Response({status: 200})
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }

}