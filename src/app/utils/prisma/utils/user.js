import prisma from "../client";

export async function GetUserData(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            isPrivate: true,
            username: true,
            email: false,
            password: false
        }
    })

    return user
}

export async function GetPrivacySetting(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return user.isPrivate
}