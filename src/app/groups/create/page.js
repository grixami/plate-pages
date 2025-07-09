"use client"

import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/forms/loading";

export default function GroupsCreate() {

    const [createGroupErrMsg, setCreateGroupErrMsg] = useState("testing")
    const [createGroupLoading, setCreateGroupLoading] = useState(false)

    const [groupName, setGroupName] = useState("")
    const [groupDesc, setGroupDesc] = useState("")

    const router = useRouter()

    const submitCreateGroup = async (e) => {
        e.preventDefault()
        setCreateGroupErrMsg("")
        try {
            setCreateGroupLoading(true)
            const resp = await fetch("/api/groups/creategroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: groupName,
                    desc: groupDesc
                })
            })
            const respJson = await resp.json()
            if(!resp.ok) {
                setCreateGroupErrMsg(respJson.error)
                if(resp.status == 429) {
                    setCreateGroupErrMsg("You have been rate limited")
                }
                setCreateGroupLoading(false)
                return
            }
            setCreateGroupLoading(false)
            router.push(`/groups/view?id=${respJson.id}`)
        } catch(error) {
            setCreateGroupErrMsg("Unknown error")
            setCreateGroupLoading(false)
        }
    }

    return (
    <div className="flex w-full h-screen">
        <div className="w-[40%] md:w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
            <Sidebar selected={"groups"}/>
        </div>
        <div className="w-[60%] md:w-[83%] h-full bg-[#edede9] flex flex-col max-h-full overflow-y-auto">
            <div className="flex flex-col mt-5 ml-5">
                <div className="flex">
                    <form onSubmit={(e) => submitCreateGroup(e)} className="flex flex-col bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-lg p-4">
                        <h1 className="text-4xl font-bold text-center">Create Group</h1>
                        <p className="mt-4">Group name</p>
                        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="group name..." className="border-2 focus:border-blue-400 focus:outline-none rounded-lg p-2"/>
                        <p className="mt-4">Group description</p>
                        <textarea type="text" value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)} placeholder="group description..." rows={4} className="border-2 focus:border-blue-400 focus:outline-none rounded-lg p-2 resize-none"/>
                        {!createGroupLoading ? (
                            <button className="mt-4 p-2 bg-purple-400 rounded-lg text-xl font-bold text-white hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">Create group</button>
                        ) : (
                            <div className="mt-4 p-2">
                                <Loading/>
                            </div>
                        )}
                        {createGroupErrMsg.length > 0 && (
                            <div className="flex items-center justify-center bg-red-500 p-2 rounded-lg mt-2">
                                <p className="text-white text-center font-bold">Error: {createGroupErrMsg}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}