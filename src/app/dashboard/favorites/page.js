"use client"

import LoadingRecipeCard from "@/app/components/dashboard/loadingrecipecard";
import RecipeFavCard from "@/app/components/dashboard/recipefavcard";
import { Sidebar } from "@/app/components/sidebar";
import { LoadingRecipeStarsPlaceholders } from "@/app/utils/setvalues";
import { useEffect, useState } from "react";

export default function Favorites () {
    const [favs, setFavs] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getFavs = async () => {
            const resp = await fetch("/api/user/getownfavorites")
            const respJson = await resp.json()
            setFavs(respJson)
            setIsLoading(false)
        }

        getFavs()
    }, [])

    const toggleFavorite = async (id) => {
        setFavs((prevFavs) =>
            prevFavs.map((recipe) =>
                recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
            )
        )
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
            <div className="w-[40%] md:w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                <Sidebar selected={"fav"}/>
            </div>
            <div className="w-[60%] md:w-[83%] h-full bg-[#edede9] flex flex-col">
                <h1 className="text-4xl my-4 ml-4 font-bold">Your favorite recipes</h1>
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 mx-5 mt-4">
                        {favs.length > 0 && favs.map((fav) => (
                            <RecipeFavCard key={fav.id} recipe={fav} isFavorite={true} toggleFavorite={toggleFavorite}/>
                        ))}
                        {isLoading && Array.from({ length: LoadingRecipeStarsPlaceholders }).map((_, index) => (
                            <LoadingRecipeCard key={index}/>
                        ))}

                        {!isLoading && favs.length === 0 && (
                            <h1 className="text-3xl font-bold">You have no favorite recipes</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}