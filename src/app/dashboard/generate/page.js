"use client"

import Loading from "@/app/components/forms/loading"
import { Sidebar } from "@/app/components/sidebar"
import { useState } from "react"

export default function Generate() {
    const [generateLoading, setGenerateLoading] = useState(false)
    const [generateError, setGenerateError] = useState("")

    const [saveLoading, setSaveLoading] = useState(false)
    const [saveError, setSaveError] = useState("")

    const [timeToMake, setTimeToMake] = useState(30)
    const [generateDesc, setGenerateDesc] = useState("")
    const [generateAllergies, setGenerateAllergies] = useState("")

    const [generationResponse, setGenerationResponse] = useState([])

    const generateRecipe = async () => {
        try {
            setGenerateLoading(true)
            const resp = await fetch("todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    desc: generateDesc,
                    allergies: generateAllergies,
                    timeToMake: timeToMake
                })
            })

            const respJson = await resp.json()

            if(!resp.ok) {
                setGenerateError(respJson.error)
                if(resp.status === 429) {
                    setGenerateError("You have been ratelimited")
                }
                setGenerateLoading(false)
                return
            }


            setGenerationResponse("TODO") // TODO
            setGenerateLoading(false)
        } catch(error) {
            setGenerateLoading(false)
            setGenerateError("Unknown Error")
        }
    }

    const saveGeneratedRecipe = async () => {
        try {
            setSaveLoading(true)
            const resp = await fetch("TODO", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    todo: "TODO"
                })
            })

            const respJson = await resp.json()

            if(!resp.ok) {
                setSaveError(respJson.error)
                if(resp.status === 429) {
                    setSaveError("You have been ratelimited")
                }
                setSaveLoading(false)
                return
            }

            // TODO, redirect user to the post page
            setSaveLoading(true)
        } catch(error) {
            setSaveLoading(false)
            setSaveError("Unknown error")
        }
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                <Sidebar selected={"generate"}/>
            </div>
            <div className="w-[83%] h-full bg-[#edede9] flex">
                <div className="w-[30%] flex flex-col">
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-4xl font-bold">Generate recipe</h1>
                        </div>
                    </div>
                    <div className="flex mt-10 ml-10 ">
                        <form className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-3xl font-bold">Details</h1>
                            <p className="mt-4 text-xl">Description</p>
                            <textarea id="generatedesc" className="resize-none focus:outline-none border-2 focus:border-blue-400 rounded-lg p-2" cols={30} rows={5} placeholder="Enter recipe description..." value={generateDesc} onChange={(e) => setGenerateDesc(e.target.value)}></textarea>
                            <p className="mt-4 text-xl">Allergies</p>
                            <textarea className="resize-none focus:outline-none border-2 focus:border-blue-400 rounded-lg p-2" cols={30} placeholder="allergies seperate by comma, leave blank if none..." value={generateAllergies} onChange={(e) => setGenerateAllergies(e.target.value)}></textarea>
                            <p className="mt-4 text-xl">Time to make</p>
                            <input type="range" min={5} max={180} value={timeToMake} onChange={(e) => setTimeToMake(e.target.value)} className="hover:cursor-pointer w-50"/>
                            <div className="flex items-center">
                                <input id="inputtime" type="text" value={timeToMake} className="text-right w-10 text-xl inline-flex focus:outline-none" onChange={(e) => setTimeToMake(e.target.value)}/> {/* Also controls time for more precision */}
                                <p className="text-xl p-1 text-center">mins</p>
                            </div>
                            {!generateLoading ? (
                                <button className="p-2 mt-2 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">Generate Recipe</button>
                            ) : (
                                <div className="p-2 mt-2">
                                    <Loading/>
                                </div>
                            )}
                            {generateError.length > 0 && (
                            <div className="flex mt-2">
                                <div className="bg-red-400 p-2 rounded-lg ">
                                    <p className="text-white text-center font-semibold">Error: {generateError}</p>
                                </div>
                            </div>
                            )}
                        </form>
                    </div>
                </div>
                <div className="flex flex-col w-[70%]">
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-4xl font-bold">Generated recipe</h1>
                        </div>
                    </div>
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg max-w-[50%]">
                            <h1 className="font-bold text-3xl">Title placeholder</h1>
                            <p className="text-lg">placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description</p>
                            <hr className="my-6 border-1"></hr>
                            <div className="flex flex-col max-w-[80%] space-y-2">
                                <h2 className="text-2xl font-bold">Ingredients</h2>
                                <div className="flex justify-between">
                                    <p>Placeholder Ingredient</p>
                                    <p>100g</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Placeholder Ingredient number 2</p>
                                    <p>100g</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Large Placeholder Ingredient number 3</p>
                                    <p>100g</p>
                                </div>
                            </div>
                            <hr className="my-6 border-1"></hr>
                            <div className="flex flex-col space-y-2">
                                <h2 className="font-bold text-2xl">Instructions</h2>
                                <div>
                                    <p><b>1&#41;</b> This is an extremely detailed example instruction on how to make an ai generated recipe</p>
                                </div>
                                <div>
                                    <p><b>2&#41;</b> This is an extremely detailed example instruction on how to make an ai generated recipe</p>
                                </div>
                                <div>
                                    <p><b>3&#41;</b> This is an extremely detailed example instruction on how to make an ai generated recipe</p>
                                </div>
                            </div>
                            {!saveLoading ? (
                                <button className="p-2 mt-6 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">Save Recipe</button>
                            ) : (
                                <div className="p-2 mt-2">
                                    <Loading/>
                                </div>
                            )}
                            {saveError.length > 0 && (
                            <div className="flex mt-2">
                                <div className="bg-red-400 p-2 rounded-lg ">
                                    <p className="text-white text-center font-semibold">Error: {saveError}</p>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}