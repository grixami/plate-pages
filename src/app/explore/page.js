"use client"

import Image from "next/image";
import { Sidebar } from "../components/sidebar";
import UserRecipeCard from "../components/dashboard/userrecipecard";
import LoadingRecipeCard from "../components/dashboard/loadingrecipecard";
import { useEffect, useState } from "react";
import { LoadingRecipePlaceholders } from "../utils/setvalues";

export default function ExploreHomepage() {
    const [recentRecipe, setRecentRecipe] = useState([])
    const [loading, setLoading] = useState(true)

    const [includeAi, setIncludeAi] = useState(true)

    const toggleIncludeAi = () => {
        setIncludeAi(!includeAi)
    }

    useEffect(() => {
        const getRecentRecipe = async () => {
            const resp = await fetch("/api/recipe/getrecentrecipe")
            const respJson = await resp.json()

            setRecentRecipe(respJson)
            setLoading(false)
        }
        getRecentRecipe()
    }, [])

    return (
        <div className="flex w-full h-screen">
            <div className="w-[40%] md:w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                <Sidebar selected={"explore"}/>
            </div>
            <div className="w-[60%] md:w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
                <div className="h-[15%] flex items-center justify-center">
                    <form action={"/explore/search"} className="w-5/6 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] p-2 rounded-xl flex space-x-2">
                        <button type="submit">
                            <Image
                                className="hover:cursor-pointer transition-transform ease-in-out duration-300 hover:scale-115 hover:-rotate-15"
                                src={"/assets/icon/search.svg"}
                                alt=""
                                width={30}
                                height={30}
                            />
                        </button>
                        <input name="q" type="text" placeholder="recipe title..." className="w-full focus:outline-none"/>
                    </form>
                </div>
                <div className="flex space-x-2 items-center">
                    <h1 className="text-4xl my-4 ml-5 font-bold">Most recent recipes</h1>
                    <div className="flex">
                        {includeAi ? (
                                <button className="text-lg px-2 py-2 rounded-lg text-white font-bold bg-purple-400 transition-transform ease-in-out duration-300 hover:scale-105 hover:-rotate-5 hover:bg-purple-600 hover:cursor-pointer" onClick={() => toggleIncludeAi()}>Ai is included</button>
                        ) : (
                            <button className="text-lg px-2 py-2 rounded-lg text-white font-bold bg-purple-400 transition-transform ease-in-out duration-300 hover:scale-105 hover:-rotate-5 hover:bg-purple-600 hover:cursor-pointer" onClick={() => toggleIncludeAi()}>Ai not included</button>
                        )}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mx-5 mt-4">
                        {recentRecipe.length > 0 && recentRecipe.map((recipe) => (
                            includeAi ? (
                                <UserRecipeCard key={recipe.id} recipe={recipe}/>
                            ) : (
                                recipe.aigen === false && (
                                    <UserRecipeCard key={recipe.id} recipe={recipe}/>
                                )
                            )
                        ))}
                        {loading && Array.from({ length: LoadingRecipePlaceholders }).map((_, index) => (
                            <LoadingRecipeCard key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}