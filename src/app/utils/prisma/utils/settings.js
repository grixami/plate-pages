import HashString from "../../bcrypt/hashstring";
import prisma from "../client";

export async function SetEmail(userId, email) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            email: email
        }
    })

    return user
    
}

export async function SetUsername(userId, username) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: username
        }
    })

    return user
}

export async function SetPassword(userId, password) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            password: HashString(password)
        }
    })

    return user
}