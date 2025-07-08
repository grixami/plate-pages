import { setPrivateProfile } from "@/app/utils/prisma/utils/settings"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const {privatePorfile} = await request.json()
        const token = (await cookies()).get("token")?.value

        if(privatePorfile === null || !token) { // privatePorfile can be false so i check if it equals null
            return new Response(JSON.stringify({ error: "Missing privacy or auth token" }), {
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

        const user = await setPrivateProfile(userId, privatePorfile)

        return new Response()
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error"}))
    }
}