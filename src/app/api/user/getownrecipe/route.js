import { GetUserRecipes } from "@/app/utils/prisma/utils/recipe";
import { cookies } from "next/headers";
const jwt = await require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

export async function GET(request) {
    try {
        const token = (await cookies()).get("token")?.value
        let userId

        try {
           const decoded = jwt.verify(token, jwtSecret)
           userId = decoded.userId
        } catch(error) {
            return new Response(JSON.stringify({ error: "Auth token is invalid" }), {
                status: 401
            })
        }

        const recipes = await GetUserRecipes(userId)

        return new Response(JSON.stringify(recipes), {
            status: 200
        })

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }
    
}