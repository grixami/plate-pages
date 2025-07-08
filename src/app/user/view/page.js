"use client"

import Image from "next/image";
import { Sidebar } from "@/app/components/sidebar";
import { Suspense, useEffect, useState } from "react";
import LoadingRecipeCard from "@/app/components/dashboard/loadingrecipecard";
import { LoadingRecipePlaceholders, LoadingRecipeStarsPlaceholders } from "@/app/utils/setvalues";
import { useSearchParams } from "next/navigation";
import UserRecipeCard from "@/app/components/dashboard/userrecipecard";

function ViewUser() {
    const [recipes, setRecipes] = useState([])
    const [favs, setFavs] = useState([])
    const [userData, setUserData] = useState([])
    const [getRecipeLoading, setRecipeLoading] = useState(true)
    const [privProfile, setPrivProfile] = useState(false)

    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    useEffect(() => {
        const fetchData = async () => {
            const userResp = await fetch(`/api/user/getuser?id=${id}`)
            if (userResp.status === 403) {
                setPrivProfile(true)
                return
            }

            const userJson = await userResp.json()
            setUserData(userJson)

            const favsResp = await fetch(`/api/user/getuserfavs?id=${id}`)
            const favsJson = await favsResp.json()
            setFavs(favsJson)

            const recipesResp = await fetch(`/api/user/getuserrecipe?id=${id}`)
            const recipesJson = await recipesResp.json()
            setRecipes(recipesJson)
            setRecipeLoading(false)
        }
        
    fetchData()
}, [id])

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
                {!privProfile ? (
                <>
                <h1 className="text-4xl my-4 ml-4 font-bold">{getRecipeLoading ? ("loading") : (userData?.username)}&apos;s  Created Recipes</h1>
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-x-6 gap-y-6 mx-5 mt-4">
                        {recipes.length > 0 && recipes.map((recipe) => (
                            <UserRecipeCard key={recipe.id} recipe={recipe}/>
                        ))}
                        {getRecipeLoading && Array.from({ length: LoadingRecipePlaceholders }).map((_, index) => (
                            <LoadingRecipeCard key={index}/>
                        ))}
                    </div>
                </div>
                <h1 className="text-4xl my-4 ml-4 font-bold">{getRecipeLoading ? ("loading") : (userData?.username)}&apos;s  Favorite Recipes</h1>
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-x-6 gap-y-6 mx-5 mt-4">
                        {recipes.length > 0 && favs.map((fav) => (
                            <UserRecipeCard key={fav.id} recipe={fav}/>
                        ))}
                        {getRecipeLoading && Array.from({ length: LoadingRecipeStarsPlaceholders }).map((_, index) => (
                            <LoadingRecipeCard key={index}/>
                        ))}
                    </div>
                </div>
                </>
                ) : (
                    <h1 className="ml-4 font-bold text-4xl">Users profile is private</h1>
                )}
            </div>
        </div>
    );
}

export default function ViewUserSuspense() {
    return (
        <Suspense>
            <ViewUser/>
        </Suspense>
    )
}