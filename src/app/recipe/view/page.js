"use client"

import { Sidebar } from "@/app/components/sidebar"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

function RecipeView() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(true)

    const [isStarred, setIsStarred] = useState(false)

    useEffect(() => {
        const getRecipe = async () => {
            const resp = await fetch(`/api/recipe/getrecipe?id=${id}`)
            const respJson = await resp.json()

            const parsed = {
                ...respJson,
                ingredients: JSON.parse(respJson.ingredients),
                instructions: JSON.parse(respJson.instructions),
            }
            setLoading(false) // can set loading as false here as the getIsStarred runs before and loading will be complete
            setRecipe(parsed)
        }

        const getIsStarred = async () => {
            const resp = await fetch(`/api/recipe/star/getisstarred?id=${id}`)
            const respJson = await resp.json()

            setIsStarred(respJson.starred)
        }

        getIsStarred()
        getRecipe()
    }, [id])

    const toggleStarred = async () => {
        setIsStarred(!isStarred)

        const resp = await fetch("/api/recipe/star", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                <Sidebar selected={"explore"}/>
            </div>
            <div className="w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
                <div className="flex items-center justify-center mt-8">
                    <div className="p-2 rounded-xl bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                        {!loading ? (
                        <div className="flex flex-col  gap-y-2 px-4 py-6">
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex space-x-3">
                                    <h1 className="text-4xl font-bold">{recipe?.title}</h1>
                                    {isStarred ? (
                                    <button onClick={() => toggleStarred()} className="transition-transform duration-300 ease-in-out hover:scale-115 hover:-rotate-15 hover:cursor-pointer">
                                        <Image
                                            src={"/assets/icon/star.svg"}
                                            alt="star"
                                            width={40}
                                            height={40}
                                        />  
                                    </button>
                                    ) : (
                                    <button onClick={() => toggleStarred()} className="transition-transform duration-300 ease-in-out hover:scale-115 hover:-rotate-15 hover:cursor-pointer">
                                        <Image
                                            src={"/assets/icon/nostar.svg"}
                                            alt="star"
                                            width={40}
                                            height={40}
                                        />  
                                    </button>
                                    )}
                                    
                                </div>
                                {recipe?.aigen && (
                                    <p className="text-2xl my-4">Made with ai</p>
                                )}
                                <p className="text-lg">{recipe?.description}</p>
                                <p className="text-sm">By: <a href={`/user/view?id=${recipe?.authorId}`}>{recipe?.author?.username}</a></p>
                            </div>
                        </div>
                        ) : (
                        <div className="flex flex-col items-center justify-center gap-y-2 px-4 py-6">
                            <p className="w-3/4 h-8 bg-gray-300 rounded-2xl animate-pulse text-black/0">Loading title</p>
                            <p className="w-5/6 h-6 bg-gray-300 rounded-2xl animate-pulse text-black/0">Loading the description</p>
                            <p className="w-1/2 h-6 bg-gray-300 rounded-2xl animate-pulse text-black/0">Loading author</p>
                        </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <div className="p-2 rounded-xl bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)]">
                        <table className="table-fixed border-separate border-spacing-y-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left border-b">Ingredient</th>
                                    <th className="px-4 py-2 text-left border-b">Quantity</th>
                                </tr>
                            </thead>
                            {!loading ? (
                                <tbody>
                                {recipe.ingredients?.map((ingredient) => (
                                    <tr key={ingredient.id}>
                                        <td className="px-4 py-2 text-left border-r-2">{ingredient.ingredient}</td>
                                        <td className="px-4 py-2 text-left">{ingredient.quantity}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                ) : (
                                <tbody className="">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index}>
                                            <td className="w-3/4 h-7 bg-gray-300 rounded-2xl animate-pulse text-black/0"></td>
                                            <td className="w-3/4 h-7 bg-gray-300 rounded-2xl animate-pulse text-black/0"></td>
                                        </tr>
                                    ))}
                                </tbody>
                                )}
                        </table>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-8 mb-16">
                    <div className="flex flex-col p-2 rounded-xl bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] max-w-1/3">
                        <h2 className="font-bold text-center text-3xl px-6">Instructions</h2>
                        {!loading ? (
                        <ul className="space-y-8 mt-2">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="flex space-x-2">
                                    <p className="font-bold">{index+1}&#41;</p>
                                    <p>{instruction.instruction}</p>
                                </li>
                            ))}
                        </ul>
                        ) : (
                        <ul className="space-y-8 mt-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <li key={index} className="flex flex-col space-x-50 space-y-1">
                                    <p className="w-full h-6 bg-gray-300 rounded-2xl animate-pulse text-black/0">Loading authorasdadsadads</p>
                                    <p className="w-1/2 h-6 bg-gray-300 rounded-2xl animate-pulse text-black/0">Loading</p>
                                    <p className="w-2/3 h-6 bg-gray-300 rounded-2xl animate-pulse text-black/0">Loading</p>
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default function GetPost() {
    return (
        <Suspense>
            <RecipeView/>
        </Suspense>
    )
}