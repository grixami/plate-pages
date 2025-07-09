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

export async function GetUserAiTokens(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return user.aitoken
}

export async function DecrementAiTokens(userId) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            aitoken: {
                decrement: 1
            }
        }
    })

    return user
    
}