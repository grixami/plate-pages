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

export async function GetUserRecipes(userId) {
    const recipes = await prisma.recipe.findMany({
        where: {
            author: {
                id: userId
            }
        }
    })

    return recipes
}

export async function CheckUserOwnsRecipe(userId, recipeId) {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId
        }
    })

    return recipe.authorId === userId
}

export async function DeleteRecipe(recipeId) {
    const recipe = await prisma.recipe.delete({
        where: {
            id: recipeId
        }
    })
    
    return recipe
}

export async function GetRecipe(recipeId) {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId
        }
    })

    return recipe
}

export async function UpdateRecipe(recipeId, title, desc, ingredients, instructions, time) {
    const recipe = await prisma.recipe.update({
        where: {
            id: recipeId
        },
        data: {
            title: title,
            description: desc,
            ingredients: ingredients,
            instructions: instructions,
            cooktime: time
        }
    })
}