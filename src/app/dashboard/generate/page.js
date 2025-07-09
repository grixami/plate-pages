"use client"

import Loading from "@/app/components/forms/loading"
import { Sidebar } from "@/app/components/sidebar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Generate() {
    const router = useRouter()

    const [aiTokens, setAiTokens] = useState(-1)
    const [aiTokensLoading, setAiTokensLoading] = useState(true)

    const [generateLoading, setGenerateLoading] = useState(false)
    const [generateError, setGenerateError] = useState("")

    const [saveLoading, setSaveLoading] = useState(false)
    const [saveError, setSaveError] = useState("")

    const [timeToMake, setTimeToMake] = useState(30)
    const [generateDesc, setGenerateDesc] = useState("")
    const [generateAllergies, setGenerateAllergies] = useState("")

    const [generationResponse, setGenerationResponse] = useState({})
    const [generated, setGenerated] = useState(false)

    useEffect(() => {
        const getAiTokens = async () => {
            try {
                const resp = await fetch("/api/user/getaitokens")
                const respJson = await resp.json()

                setAiTokens(respJson.count)
                setAiTokensLoading(false)
            } catch(error) {
                setAiTokensLoading(false)
            }
        }
        getAiTokens()
    }, [])

    const generateRecipe = async (e) => {
        e.preventDefault()
        try {
            if(aiTokens === 0) {
                setGenerateError("You have no ai tokens left")
                return
            }
            setAiTokens(aiTokens - 1)
            setGenerateLoading(true)
            setGenerateError("")
            const resp = await fetch("/api/generate/generaterecipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    desc: generateDesc,
                    allergies: generateAllergies,
                    time: timeToMake
                })
            })

            const respJson = await resp.json()

            if (respJson?.error == "I'm sorry, I cannot assist with that.") {
                setGenerateError("Inappropriate recipe description");
                setGenerateLoading(false)
                return
            }

            if(!resp.ok) {
                setGenerateError(respJson.error)
                if(resp.status === 429) {
                    setGenerateError("You have been ratelimited")
                }
                setGenerateLoading(false)
                return
            }

            setGenerationResponse(respJson) // TODO
            setGenerateLoading(false)
            setGenerated(true)
        } catch(error) {
            setGenerateLoading(false)
            setGenerateError("Unknown Error")
        }
    }

    const saveGeneratedRecipe = async (e) => {
        try {
            setSaveLoading(true)
            setSaveError("")
            const resp = await fetch("/api/generate/savegenerated", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    recipeDetails: generationResponse
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
            
            setSaveLoading(false)
            router.push(`/recipe/view?id=${respJson.id}`)
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
            <div className="w-[83%] h-full bg-[#edede9] flex overflow-y-auto">
                <div className="w-[30%] flex flex-col">
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-4xl font-bold">Generate recipe</h1>
                        </div>
                    </div>
                    {!aiTokensLoading ? (
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-3xl font-bold">Tokens Remaining: {aiTokens}</h1>
                        </div>
                    </div>
                    ) : (
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-3xl font-bold text-black/0 bg-black/30 animate-pulse rounded-2xl">Tokens Remaining: 22</h1> {/* Text is invisible */}
                        </div>
                    </div>
                    )}
                    <div className="flex mt-10 ml-10">
                        <form onSubmit={(e) => generateRecipe(e)} className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
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
                {generated && (
                <div className="flex flex-col w-[70%] pb-20">
                    <div className="flex mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg">
                            <h1 className="text-4xl font-bold">Generated recipe</h1>
                        </div>
                    </div>
                    <div className="flex flex-col mt-10 ml-10">
                        <div className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white p-3 rounded-lg max-w-[50%]">
                            <h1 className="font-bold text-3xl">{generationResponse.title}</h1>
                            <p className="text-lg">{generationResponse.description}</p>
                            <hr className="my-6 border-1"></hr>
                            <div className="flex flex-col space-y-2">
                                <h2 className="text-2xl font-bold">Ingredients</h2>
                                {generationResponse.ingredients.map((ingredient) => (
                                <div key={ingredient.id} className="flex justify-between">
                                    <p>{ingredient.ingredient}</p>
                                    <p>{ingredient.quantity}</p>
                                </div>
                                ))}
                            </div>
                            <hr className="my-6 border-1"></hr>
                            <div className="flex flex-col space-y-2">
                                <h2 className="font-bold text-2xl">Instructions</h2>
                                {generationResponse.instructions.map((instruction, index) => (
                                <div key={instruction.id} className="flex justify-between">
                                    <p><b className="mr-1">{index + 1}&#41;</b>{instruction.instruction}</p>

                                </div>
                                ))}
                            </div>
                            {!saveLoading ? (
                                <button onClick={() => saveGeneratedRecipe()} className="p-2 mt-6 bg-purple-500 rounded-xl text-white font-bold hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">Save Recipe</button>
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
                        <div className="h-20 w-20"></div> {/* Spacer at the bottom */}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}