import { SetUsername } from "@/app/utils/prisma/utils/settings"
import { MaxUsernameLen } from "@/app/utils/setvalues"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const {username} = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!username || !token) {
            return new Response(JSON.stringify({ error: "Missing username or auth token" }), {
                status: 400
            })
        }

        if(username.length > MaxUsernameLen) {
            return new Response(JSON.stringify({ error: "Username must be shorter than 15 characters" }), {
                status: 400
            })
        }

        if(username.length === 0) {
            return new Response(JSON.stringify({ error: "Please set a username" }), {
                status: 400
            })
        }

        let decoded

        try {
            decoded = jwt.verify(token, jwtSecret)
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid auth token" }), {
                status: 401
            })
        }

        const userId = decoded.userId
        const user = await SetUsername(userId, username)
        
        return new Response({status: 200})
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}