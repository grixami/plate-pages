"use client"

import LoadingRecipeCard from "@/app/components/dashboard/loadingrecipecard"
import UserRecipeCard from "@/app/components/dashboard/userrecipecard"
import { Sidebar } from "@/app/components/sidebar"
import { LoadingRecipePlaceholders } from "@/app/utils/setvalues"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

function Search() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q")

    const [recipes, setRecipes] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSearchRecipes = async () => {
            const resp = await fetch(`/api/recipe/searchrecipes?q=${query}`)
            const respJson = await resp.json()

            setRecipes(respJson)
            setLoading(false)
        }

        getSearchRecipes()
    }, [query])

    return (
    <div className="flex w-full h-screen">
        <div className="w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
            <Sidebar selected={"explore"}/>
        </div>
        <div className="w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
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
            <h1 className="text-4xl my-4 ml-4 font-bold">Recent with title &quot;{query}&quot;</h1>  
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-4 gap-x-6 gap-y-6 mx-5 mt-4">
                    {recipes.length > 0 && recipes.map((recipe) => (
                        <UserRecipeCard key={recipe.id} recipe={recipe}/>
                    ))}
                    {loading && Array.from({ length: LoadingRecipePlaceholders }).map((_, index) => (
                        <LoadingRecipeCard key={index}/>
                    ))}
                    {!loading && recipes.length === 0 && (
                        <h1 className="text-3xl">No Recipes found</h1>
                    )} 
                </div>
            </div>
        </div>
    </div>
    )
}

export default function SearhSuspense() {
    return (
    <Suspense>
        <Search/>
    </Suspense>
    )
}