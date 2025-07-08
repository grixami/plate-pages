import prisma from "../client";

export async function GetUserData(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            username: true,
            email: false,
            password: false
        }
    })

    return user
}