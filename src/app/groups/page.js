"use client"

import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useRouter } from "next/navigation";

export default function Groups() {

    const router = useRouter()

    const [groups, setGroups] = useState([])
    const [ownGroups, setOwnGroups] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(true)

    useEffect(() => {
        const getGroups = async () => {
            const resp = await fetch("/api/groups/getgroups")
            const respJson = await resp.json()
            setGroups(respJson)

            const resp2 = await fetch("/api/groups/getowngroups")
            const resp2Json = await resp2.json()
            setOwnGroups(resp2Json)
            setLoading(false)
        }
        getGroups()
    }, [])

    const joinGroup = async (id) => {
        const resp = await fetch("/api/groups/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                id: id
            })
        })
        router.push(`/groups/view?id=${id}`)
    }

    return (
    <div className="flex w-full h-screen">
        <div className="w-[40%] md:w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
            <Sidebar selected={"groups"}/>
        </div>
        <div className="w-[60%] md:w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
            <div className="flex flex-col mt-5 ml-5">
                <h1 className="font-bold text-5xl">Groups</h1>
                <div className="flex">
                    <a href="/groups/create" className="mt-3 p-2 bg-purple-400 text-white font-bold text-xl rounded-lg transition-transform ease-in-out duration-300 hover:scale-105 hover:rotate-3 hover:cursor-pointer">Create Group</a>
                    {view ? (
                        <button className="ml-2 mt-3 p-2 bg-purple-400 text-white font-bold text-xl rounded-lg transition-transform ease-in-out duration-300 hover:scale-105 hover:rotate-3 hover:cursor-pointer" onClick={() => setView(!view)}>View your groups</button>
                    ): (
                        <button className="ml-2 mt-3 p-2 bg-purple-400 text-white font-bold text-xl rounded-lg transition-transform ease-in-out duration-300 hover:scale-105 hover:rotate-3 hover:cursor-pointer" onClick={() => setView(!view)}>View all groups</button>
                    )}
                </div>
            </div>
            {view ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 ml-5 gap-5 w-[95%]">
                {!loading && groups.length > 0 && groups.map((group) => (
                    <div key={group?.id} className="bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg py-8 transition-transform duration-300 ease-in-out hover:scale-105">
                        <h2 className="text-center font-bold text-3xl">{group?.name}</h2>
                        <p className="text-center text-lg">{group?.description}</p>
                        <div className="flex justify-center mt-4">
                            <button className="p-2 bg-purple-400 rounded-lg text-white text-xl font-bold hover:cursor-pointer hover:bg-purple-600" onClick={(e) => joinGroup(group?.id)}>Join</button>
                        </div>
                    </div>
                ))}
                {loading && (
                loading && Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg py-8 transition-transform duration-300 ease-in-out hover:scale-105">
                        <h2 className="text-center font-bold text-3xl text-black/0 bg-gray-400 animate-pulse rounded-2xl">Gname</h2>
                        <p className="text-center text-lg text-black/0 bg-gray-400 animate-pulse rounded-2xl">Gdesc</p>
                    </div>
                ))
                )}
            </div>          
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 ml-5 gap-5 w-[95%]">
            {!loading && ownGroups.length > 0 && ownGroups.map((group) => (
                <div key={group?.id} className="bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg py-8 transition-transform duration-300 ease-in-out hover:scale-105">
                    <h2 className="text-center font-bold text-3xl">{group?.name}</h2>
                    <p className="text-center text-lg">{group?.description}</p>
                    <div className="flex justify-center mt-4">
                        <button className="p-2 bg-purple-400 rounded-lg text-white text-xl font-bold hover:cursor-pointer hover:bg-purple-600" onClick={(e) => router.push(`/groups/view?id=${group.id}`)}>View</button>
                    </div>
                </div>
            ))}
            {loading && (
            loading && Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg py-8 transition-transform duration-300 ease-in-out hover:scale-105">
                    <h2 className="text-center font-bold text-3xl text-black/0 bg-gray-400 animate-pulse rounded-2xl">Gname</h2>
                    <p className="text-center text-lg text-black/0 bg-gray-400 animate-pulse rounded-2xl">Gdesc</p>
                </div>
            ))
            )}
            </div>
            )}
        </div>
    </div>
    )
}