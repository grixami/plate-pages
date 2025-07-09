import { CreateGroup } from "@/app/utils/prisma/utils/groups"
import { cookies } from "next/headers"
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function POST(request) {
    try {
        const { name, desc } = await request.json()
        const token = (await cookies()).get("token")?.value

        if(!name || !desc) {
            return new Response(JSON.stringify({ error: "Missing paramaters" }), {
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

        const group = await CreateGroup(name, desc, userId)

        return new Response(JSON.stringify({ id: group.id }))

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }

}