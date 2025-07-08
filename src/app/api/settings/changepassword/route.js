import { SetPassword } from "@/app/utils/prisma/utils/settings"
import { MaxPassLen } from "@/app/utils/setvalues"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const {password} = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!password || !token) {
            return new Response(JSON.stringify({ error: "Missing password or auth token" }), {
                status: 400
            })
        }

        if(password.length > MaxPassLen) {
            return new Response(JSON.stringify({ error: "Password must be longer than 40 characters" }), {
                status: 400
            })
        }

        if(password.length === 0) {
            return new Response(JSON.stringify({ error: "Please set a password" }), {
                status: 400
            })
        }

        let decoded

        try {
            decoded  = jwt.verify(token, jwtSecret)
        } catch(error) {
            return new Response(JSON.stringify({ error: "Invalid auth token"}), {
                status: 401
            })
        }

        const userId = decoded.userId

        const user = await SetPassword(userId, password)
        return new Response({status: 200})

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}