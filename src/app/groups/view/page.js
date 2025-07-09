"use client"

import RecipeCard from "@/app/components/dashboard/recipecard"
import UserRecipeCard from "@/app/components/dashboard/userrecipecard"
import { Sidebar } from "@/app/components/sidebar"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

function ViewGroup() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const [groupLoaded, setGroupLoaded] = useState(false)
    const [groupDetails, setGroupDetails] = useState({})

    useEffect(() => {
        const getGroup = async () => {
            const resp = await fetch(`/api/groups/getgroup?id=${id}`)
            const respJson = await resp.json()
            setGroupDetails(respJson)
            setGroupLoaded(true)
        }

        getGroup()
    }, [])

    return (
    <div className="flex w-full h-screen">
        <div className="w-[40%] md:w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
            <Sidebar selected={"groups"}/>
        </div>
        <div className="w-[60%] md:w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
            <div className="flex flex-col mt-5 ml-5 items-center">
                <div className="w-11/12 md:w-1/3">
                    <div className=" bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg p-4 ">
                        {groupLoaded ? (
                            <div className="flex flex-col space-y-2">
                                <h1 className="text-3xl text-center font-bold">{groupDetails?.name}</h1>
                                <p className="text-lg text-center">{groupDetails?.description}</p>
                                <p className="text-center">Owner: <a href={`/user/view?id=${groupDetails?.owner?.id}`}>{groupDetails?.owner?.username}</a></p>
                                <p className="text-center">Member count: {groupDetails?.members?.length}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <h1 className="bg-gray-400 animate-pulse text-black/0 rounded-2xl text-3xl text-center">Group title Group title</h1>
                                <p className="bg-gray-400 animate-pulse text-black/0 rounded-2xl text-sm text-center">Group descdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</p>
                                <p className="bg-gray-400 animate-pulse text-black/0 rounded-2xl text-sm text-center">Group descdescdescdescdescdescdescdescdescdescdescdescdescdescdesc</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex mt-10">
                    <div className="flex flex-col bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg p-4 ">
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-3xl text-center font-bold">Group member recipes</h1>
                        </div>
                    </div>
                </div>
                <div className="flex mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {groupLoaded && groupDetails?.recipes?.length > 0 && groupDetails.recipes.map((recipe) => (
                            <UserRecipeCard key={recipe} recipe={recipe}/>
                        ))}

                    </div>
                    {groupLoaded && groupDetails?.recipes?.length === 0 && (
                        <div className="flex">
                        <h2 className="text-center text-3xl">Group members have posted 0 recipes</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default function SuspenseViewGroup() {
    return (
        <Suspense>
            <ViewGroup/>
        </Suspense>
    )
}