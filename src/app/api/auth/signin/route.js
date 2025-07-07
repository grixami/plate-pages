import { CheckPasswordMatch, GetUserId } from "@/app/utils/prisma/utils/auth"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        if(!email || !password) {
            return new Response(JSON.stringify({ error: "Missing Parameters"}), {
                status: 400
            })
        }

        const passwordMatch = await CheckPasswordMatch(email, password)

        if(!passwordMatch) {
            return new Response(JSON.stringify({ error: "User does not exist or password does not match" }), {
                status: 403
            })
        }

        const userId = await GetUserId(email)

        const jwtPayload = {
            userId: userId
        }

        const token = jwt.sign(jwtPayload, jwtSecret)
        return new Response(JSON.stringify({ token: token }))
    } catch (error) {

        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
    
}