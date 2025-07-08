import CompareString from "../../bcrypt/comparestring";
import HashString from "../../bcrypt/hashstring";
import prisma from "../client";

export async function CheckUserExists(username, email) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    })
    
    return !!user
}

export async function CreateUser(email, username, password) {
    const user = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: HashString(password)

        }
    })

    return user
}

export async function CheckPasswordMatch(email, password) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!user) {
        return false
    }

    return CompareString(password, user.password)
}

export async function GetUserId(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user.id
}