"use client"

import Loading from "@/app/components/forms/loading"
import { Sidebar } from "@/app/components/sidebar"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import Script from "next/script"
import { Suspense, useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Sortable from "sortablejs"

function EditRecipe() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const router = useRouter()

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

    const handleEditRecipe = async () => {
        try {
            setSubmitLoading(true)
            setSubmitErrMsg("")
            const resp = await fetch("/api/recipe/saverecipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    desc: desc,
                    ingredients: ingredient,
                    instructions: instructions,
                    time: time
                })
            })
            const respJson = await resp.json()
            if(!resp.ok) {
                setSubmitErrMsg(respJson.error)
                if(resp.status == 429) {
                    setSubmitErrMsg("You have been rate limited")
                }
                setSubmitLoading(false)
                return
            }
            setSubmitLoading(false)
            router.replace(`/recipe/view?id=${respJson.id}`)
        } catch(error) {
            setSubmitLoading(false)
            setSubmitErrMsg(error.toString())
        }
    }

    const changeTimeSlider = (e) => {
        const newTime = Number(e.target.value)
        setTime(newTime)

        const inputTime = document.getElementById("inputtime")
        inputTime.value = newTime
    }

    const changeTimeInput = (e) => {
        const newTime = Number(e.target.value)
        setTime(newTime)

        const inputTimeSlider = document.getElementById("inputtimeslider")
        inputTimeSlider.value = newTime
    }

    useEffect(() => {
        const dragAndDropItems = document.getElementById("movable-items");
        new Sortable(dragAndDropItems, {
            animation: 150,
            handle: ".drag-handle",
            chosenClass: "shadow-2xl",
            onEnd: (evt) => {
                const oldIndex = evt.oldIndex;
                const newIndex = evt.newIndex;
                setIngredient((prevIngredients) => {
                    const updatedIngredients = [...prevIngredients];
                    const [movedItem] = updatedIngredients.splice(oldIndex, 1);
                    updatedIngredients.splice(newIndex, 0, movedItem);
                    return updatedIngredients;
                });
            },
        });
    }, []);

    useEffect(() => {
        const dragAndDropInstructions = document.getElementById("movable-instructions");
        new Sortable(dragAndDropInstructions, {
            animation: 150,
            handle: ".drag-handle",
            chosenClass: "shadow-2xl",
            onEnd: (evt) => {
                const oldIndex = evt.oldIndex;
                const newIndex = evt.newIndex;
                setInstructions((prevInstructions) => {
                    const updatedInstructions = [...prevInstructions];
                    const [movedItem] = updatedInstructions.splice(oldIndex, 1);
                    updatedInstructions.splice(newIndex, 0, movedItem);
                    return updatedInstructions;
                });
            },
        });
    }, []);

    useEffect(() => {
        const getData = async () => {
            const resp = await fetch(`/api/recipe/getrecipe?id=${id}`)
            const respJson = await resp.json()

            setTitle(respJson.title)
            setDesc(respJson.description)
            setIngredient(JSON.parse(respJson.ingredients))
            setInstructions(JSON.parse(respJson.instructions))
            setTime(respJson.cooktime)
        }

        getData()
    }, [id])

    return (
        <div>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js" strategy="afterInteractive"/>
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
                    <div className="mt-5 flex flex-col items-center">
                        <div className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                            <input type="text" value={title} className="p-2 focus:outline-none" placeholder="title..." onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Description</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                            <textarea value={desc} className="p-2 focus:outline-none resize-none w-100 h-30" placeholder="description..." onChange={(e) => setDesc(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Ingredients</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div id="movable-items" className="space-y-5 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                            {ingredient.map((ingredient, index) => (
                                <div key={ingredient.id} className="flex divide-x-2 space-x-2 justify-center items-center">
                                    <Image
                                        className="drag-handle cursor-move p-1"
                                        src="/assets/icon/menu.svg"
                                        alt="drag"
                                        width={40}
                                        height={40}
                                    />
                                    <input value={ingredient.ingredient} type="text" className="focus:outline-none text-center" placeholder="Ingredient..." onChange={(e) => handleIngredientChange(index, "ingredient", e.target.value)}/>
                                    <input value={ingredient.quantity} type="text" className="focus:outline-none text-center" placeholder="Quantity..." onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}/>
                                    <button className="p-1 bg-red-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => removeIngredient(ingredient.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        <div  className="flex justify-center items-center">
                            <button className="mt-3 p-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => addIngredient()}>Add Ingredient</button>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Instructions</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center ">
                        <div id="movable-instructions" className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] divide-y-2">
                            {instructions.map((instruction, index) => (
                                <div key={instruction.id} className="flex justify-center items-center space-2">
                                    <Image
                                        className="drag-handle cursor-move p-1"
                                        src="/assets/icon/menu.svg"
                                        alt="drag"
                                        width={40}
                                        height={40}
                                    />
                                    <p className="p-2">{index + 1}&#41;</p>
                                    <textarea value={instruction.instruction} cols={80} rows={5} placeholder="Enter instruction..." className="resize-none p-2 focus:outline-none" onChange={(e) => handleInstructionchange(index, "instruction", e.target.value)}/>
                                    <button className="p-1 bg-red-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => removeInstruction(instruction.id)}>Remove</button>
                                </div>
                            ))}

                        </div>
                        <div className="flex justify-center items-center">
                            <button className="mt-3 p-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => addInstruction()}>Add Instruction</button>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex items-center justify-center p-2 rounded-xl">
                            <h2 className="text-3xl font-semibold">Time to make</h2>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col items-center">
                        <div id="inputtimeslider" className="space-y-4 bg-white p-2 rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] divide-y-2">
                            <input type="range" min={5} max={180} value={time} onChange={(e) => changeTimeSlider(e)} className="hover:cursor-pointer w-50"/>
                            <div className="flex items-center">
                                <input id="inputtime" type="text" value={time} className="text-right w-10 text-xl inline-flex focus:outline-none" onChange={(e) => changeTimeInput(e)}/> {/* Also controls time for more precision */}
                                <p className="text-xl p-1 text-center">mins</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center mb-50">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white flex flex-col space-y-2 items-center justify-center p-2 rounded-xl">
                            {!submitLoading ? (
                                <button className="p-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => handleEditRecipe()}>Save Recipe</button>
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

export default function EditRecipeSuspense() {
    return (
        <Suspense>
            <EditRecipe/>
        </Suspense>
    )
}