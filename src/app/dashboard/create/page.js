"use client"

import { Sidebar } from "@/app/components/sidebar"
import { useState } from "react"
import { nanoid } from "nanoid";
import Loading from "@/app/components/forms/loading";

export default function CreateReciped() {

    const [ingredient, setIngredient] = useState([{id: nanoid(), ingredient: "", quantity: ""}])
    const [instructions, setInstructions] = useState([{id: nanoid(), instruction: ""}])
    const [time, setTime] = useState(30)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitErrMsg, setSubmitErrMsg] = useState("")

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredient]
        updatedIngredients[index][field] = value
        setIngredient(updatedIngredients)
    }

    const handleInstructionchange = (index, field, value) => {
        const updatedInstructions = [...instructions]
        updatedInstructions[index][field] = value
        setInstructions(updatedInstructions)
    }

    const addIngredient = () => {
        const updatedIngredients = [...ingredient]
        updatedIngredients.push({id: nanoid(), ingredient: "", quantity: ""})
        setIngredient(updatedIngredients)
    }

    const addInstruction = () => {
        const updatedInstructions = [...instructions]
        updatedInstructions.push({id: nanoid(), instruction: ""})
        setInstructions(updatedInstructions)
    }

    const removeIngredient = (uuid) => {
        const updatedIngredients = [...ingredient.filter(item => item.id !== uuid)]
        setIngredient(updatedIngredients)
    }

    const removeInstruction = (uuid) => {
        const updatedInstructions = [...instructions.filter(item => item.id !== uuid)]
        setInstructions(updatedInstructions)
    }

    const handleCreateRecipe = async () => {
        try {
            setSubmitLoading(true)
            setSubmitErrMsg("")
            const resp = await fetch("/api/recipe/createrecipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    desc: desc,
                    ingredients: ingredient,
                    instructions: instructions,
                    time: time
                })
            })
            if(!resp.ok) {
                const respJson = await resp.json()
                setSubmitErrMsg(respJson.error)
                if(resp.status == 429) {
                    setSubmitErrMsg("You have been rate limited")
                }
                return
            }
            setSubmitLoading(false)
        } catch(error) {
            setSubmitLoading(false)
            setSubmitErrMsg("Unknown error")
        }
    }

    return (
        <div>

            <div className="flex w-full h-screen">
                <div className="w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                    <Sidebar selected={"create"}/>
                </div>
                <div className="w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
                    <div className="mt-8 flex justify-center ">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                        <h1 className="text-5xl font-semibold text-center">Create a new recipe</h1>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Title</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                            <input type="text" className="p-2 focus:outline-none" placeholder="title..." onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Description</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                            <textarea className="p-2 focus:outline-none resize-none w-100 h-30" placeholder="description..." onChange={(e) => setDesc(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Ingredients</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div className="space-y-5 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                            {ingredient.map((ingredient, index) => (
                                <div key={ingredient.id} className="flex divide-x-2 space-x-2 justify-center items-center">
                                    <input type="text" className="focus:outline-none text-center" placeholder="Ingredient..." onChange={(e) => handleIngredientChange(index, "ingredient", e.target.value)}/>
                                    <input type="text" className="focus:outline-none text-center" placeholder="Quantity..." onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}/>
                                    <button className="p-1 bg-red-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => removeIngredient(ingredient.id)}>Remove</button>
                                </div>
                            ))}
                            <div className="flex justify-center items-center">
                                <button className="mt-3 p-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => addIngredient()}>Add Ingredient</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Instructions</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] divide-y-2">
                            {instructions.map((instruction, index) => (
                                <div key={instruction.id} className="flex justify-center items-center space-2">
                                    <p className="p-2">{index + 1}&#41;</p>
                                    <textarea cols={80} rows={5} placeholder="Enter instruction..." className="resize-none p-2 focus:outline-none" onChange={(e) => handleInstructionchange(index, "instruction", e.target.value)}/>
                                    <button className="p-1 bg-red-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => removeInstruction(instruction.id)}>Remove</button>
                                </div>
                            ))}
                            <div className="flex justify-center items-center">
                                <button className="mt-3 p-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => addInstruction()}>Add Instruction</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Time to make</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center">
                        <div className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] divide-y-2">
                            <input type="range" min={5} max={180} onChange={(e) => setTime(e.target.value)} className="hover:cursor-pointer w-50"/>
                            <p className="text-xl p-1 text-center">{time} mins</p>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center mb-50">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex flex-col space-y-2 items-center justify-center p-2 rounded-xl">
                            {!submitLoading ? (
                                <button className="p-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => handleCreateRecipe()}>Create Recipe</button>
                            ) : (
                                <div className="p-2 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                    <Loading/>
                                </div>
                            )}
                            {submitErrMsg.length > 0 && (
                             <div className="bg-red-100 p-2 rounded-xl">
                                <p className="text-red-800 ">Error: {submitErrMsg}</p>
                            </div>   
                            )}
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}