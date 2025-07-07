"use client"

import Image from "next/image";
import { Sidebar } from "../components/sidebar";
import { useEffect, useState } from "react";
import RecipeCard from "../components/dashboard/recipecard";
import LoadingRecipeCard from "../components/dashboard/loadingrecipecard";
import { LoadingRecipePlaceholders } from "../utils/setvalues";

export default function Dashboard() {
    const [recipes, setRecipes] = useState([])
    const [getRecipeLoading, setRecipeLoading] = useState(true)

    const callbackDelete = async (recipeId) => {
        try {
            const resp = await fetch("/api/recipe/delrecipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeId: recipeId
                })
            })

            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
        } catch(error) {

        }
    }

    useEffect(() => {
        const getRecipes = async () => {
            const resp = await fetch("/api/user/getownrecipe", {
                method: "GET"
            })
            const respJson = await resp.json()
            setRecipes(respJson)
            setRecipeLoading(false)
        }
        getRecipes()
    }, [])

    return (
        <div className="flex w-full h-screen">
            <div className="w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                <Sidebar selected={"home"}/>
            </div>
            <div className="w-[83%] h-full bg-[#edede9] flex flex-col">
                <div className="h-[15%] flex items-center justify-center">
                    <form className="w-5/6 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] p-2 rounded-xl flex space-x-2">
                        <button type="submit">
                            <Image
                                className="hover:cursor-pointer transition-transform ease-in-out duration-300 hover:scale-105 hover:-rotate-15"
                                src={"/assets/icon/search.svg"}
                                alt=""
                                width={30}
                                height={30}
                            />
                        </button>
                        <input type="text" placeholder="What would you like to search for today?" className="w-full focus:outline-none"/>
                    </form>
                </div>
                <h1 className="text-4xl my-4 ml-4 font-bold">Your Created Recipes</h1>
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-x-6 gap-y-6 mx-5 mt-4">
                        {recipes.length > 0 && recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} callbackDelete={callbackDelete}/>
                        ))}
                        {getRecipeLoading && Array.from({ length: LoadingRecipePlaceholders }).map((_, index) => (
                            <LoadingRecipeCard key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}