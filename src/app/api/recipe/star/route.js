import {} from "@/app/utils/prisma/utils/recipe"

const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = parseInt(searchParams.get("id"))
        const starring = Boolean(searchParams.get("starring"))
        const token = (await cookies()).get("token")?.value

        if(!id || !token || starring === null) { //starring is checked to equal null, if it was !starring, it would return when starring is false
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

        if(!starring) { // TODO, Add a star to a user / take away a star by adding it to the prisma recipe utils

        } else {

        }
        
        return new Response({ status: 200 })
    } catch(error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
}