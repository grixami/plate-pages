import prisma from "../client";

export async function CreateRecipe(title, desc, ingredients, instructions, time, userId) {
    const recipe = await prisma.recipe.create({
        data: {
            title: title,
            description: desc,
            ingredients: JSON.stringify(ingredients),
            instructions: JSON.stringify(instructions),
            cooktime: time,
            authorId: userId
        }
    })

    return recipe
}