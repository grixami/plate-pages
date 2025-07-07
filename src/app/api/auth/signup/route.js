import { CheckUserExists, CreateUser } from "@/app/utils/prisma/utils/auth"
import { MaxPassLen, MaxUsernameLen } from "@/app/utils/setvalues"

export async function POST(request) {
    try {
        const {email, username, password} = await request.json()

        if(!email || !username || !password) {
            return new Response(JSON.stringify({ error: "Missing parameters" }), {
                status: 400
            })
        }

        if(username.length > MaxUsernameLen) {
            return new Response(JSON.stringify({ error: "Username must be 15 characters or less" }), {
                status: 400
            })
        }

        if(password.length > MaxPassLen) {
            return new Response(JSON.stringify({ error: "Password must be 40 characters or less" }), {
                status: 400
            })
        }

        const userExists = await CheckUserExists(username.trim(), email.trim())

        if(userExists) {
            return new Response(JSON.stringify({ error: "Username or Email already in use" }), {
                status: 400
            })
        }

        const newUser = await CreateUser(email.trim(), username.trim(), password)
        return new Response({status: 201})
    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500
        })
    }

}