import prisma from "../client";

export async function CreateGroup(name, desc, owner) {
    const group = await prisma.group.create({
        data: {
            name: name,
            description: desc,
            ownerId: owner,
            users: {
                connect: {
                    id: owner
                }
            }
        }
    })

    return group
}

export async function GetGroupDetails(groupId) {
    const group = await prisma.group.findUnique({
        where: { id: groupId },
        select: {
        name: true,
        description: true,
        owner: {
            select: {
                id: true,
                username: true,
            }
        },
        users: {
            select: {
            id: true,
            username: true,
            recipes: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    cooktime: true,
                    aigen: true,
                    authorId: true,
    }}}}}})

    if (!group) {
        throw new Error('Group not found');
    }

    const members = group.users.map(user => ({
        id: user.id,
        username: user.username,
    }))

    const recipes = group.users.flatMap(user => user.recipes);

    return {
        name: group.name,
        description: group.description,
        owner: group.owner,
        members,
        recipes,
    }
}

export async function AddUserToGroup(userId, groupId) {
    const updatedGroup = await prisma.group.update({
        where: {
            id: groupId
        },
        data: {
            users: {
                connect: {
                    id: userId
                }
            }
        }
    })

    return updatedGroup
}

export async function GetGroups() {
    const groups = await prisma.group.findMany({})

    return groups
}

export async function GetUserGroups(userId) {
    const groups = await prisma.group.findMany({
        where: {
            users: {
                some: {
                    id: userId
                }
            }
        }
    });

    return groups;
}