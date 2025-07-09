import OpenAI from "openai";
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
import { nanoid } from "nanoid";

export async function GenerateRecipe(desc, allergies, time) {
    const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object"},
        messages: [
            {
                role: "user",
                content:  `You are a professional giving someone instructions how to to make the best recipe possible, please make a recipe with the description of "${desc}", the person who is ashking for the recipe has allergies to "${allergies}" and they want to cook it in ${time} mins, please give the response in the following JSON format:
                    {
                        title: [string] (this is the title of the recipe)
                        description: [string] (this is the description of the recipe)
                        cooktime: [int] (this is the time in mins for it to be cooked)
                        ingredients: [
                            {
                                ingredient: [string] (name of ingredient)
                                quantity: [string] (how much of the ingredient)
                            },
                            {
                                ingredient: [string] (name of ingredient)
                                quantity: [string] (how much of the ingredient)
                            } ...
                        ]
                        instructions: [
                            {
                                id: 1
                                instruction: instruction (instruction number 1)
                            }, 
                            {
                                id: 2
                                instruction: instruction (instruction number 2)
                            } ...
                        ]
                    }`,
            }
        ],
       
        temperature: 0.7
    })

    const content = resp.choices[0].message.content
    const contentJson = JSON.parse(content)
    try {
        contentJson.instructions.forEach(instruction => {
            instruction.id = nanoid()
        }) //apply a nanoid like when you create a recipe by hand

        contentJson.ingredients.forEach(ingredient => {
            ingredient.id = nanoid()
        }) //apply a nanoid like when you create a recipe by hand
        return contentJson
    } catch {
        return contentJson
    }
}