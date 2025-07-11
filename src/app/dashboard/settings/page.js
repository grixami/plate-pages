"use client"

import Loading from "@/app/components/forms/loading";
import { Sidebar } from "@/app/components/sidebar";
import { MaxPassLen, MaxUsernameLen } from "@/app/utils/setvalues";
import { useEffect, useState } from "react";

export default function Settings() {
    const [email, setEmail] = useState("")
    const [emailSuccess, setEmailSuccess] = useState(false)
    const [emailErrMsg, setEmailErrMsg] = useState("")
    const [emailLoading, setEmailLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [usernameSuccess, setUsernamesuccess] = useState(false)
    const [usernameErrMsg, setUsernameErrMsg] = useState("")
    const [usernameLoading, setUsernameLoading] = useState(false)

    const [password, setPassword] = useState("")
    const [passwordSuccess, setPasswordSucess] = useState(false)
    const [passwordErrMsg, setPasswordErrMsg] = useState("")
    const [passwordLoading, setPasswordLoading] = useState(false)

    const [privatePorfile, setPrivateProfile] = useState(false)
    const [privatePorfileSuccess, setPrivatePorfileSucess] = useState(false)
    const [privatePorfileErrMsg, setPrivatePorfileErrMsg] = useState("")
    const [privatePorfileLoading, setPrivatePorfileLoading] = useState(false)

    useEffect(() => {
        const getPrivacy = async () => {
            const resp = await fetch("/api/settings/getprivacy")
            const respJson = await resp.json()
            setPrivateProfile(respJson?.isPrivate)
        }

        getPrivacy()
    }, [])

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        setEmailLoading(true)
        setEmailSuccess(false)
        setEmailErrMsg("")
        try {
            const resp = await fetch("/api/settings/changemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            })

            if(!resp.ok) {
                const respJson = await resp.json()
                setEmailErrMsg(respJson.error)
                if(resp.status === 429) {
                    setEmailErrMsg("You have been raitlimited")
                }
                setEmailLoading(false)
                return
            }

            setEmailSuccess(true)
            setEmailLoading(false)
        } catch(error) {
            setEmailLoading(false)
            setEmailErrMsg(error.toString())
        }
    }

    const handleUsernameSubmit = async (e) => {
        e.preventDefault()
        setUsernameLoading(true)
        setUsernamesuccess(false)
        setUsernameErrMsg("")
        try {
            const resp = await fetch("/api/settings/changeusername", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username
                })
            })

            if(!resp.ok) {
                const respJson = await resp.json()
                setUsernameErrMsg(respJson.error)
                if(resp.status === 429) {
                    setUsernameErrMsg("You have been raitlimited")
                }
                setUsernameLoading(false)
                return
            }

            setUsernamesuccess(true)
            setUsernameLoading(false)
        } catch(error) {
            setUsernameLoading(false)
            setUsernameErrMsg(error.toString())
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setPasswordLoading(true)
        setPasswordSucess(false)
        setPasswordErrMsg("")
        try {
            const resp = await fetch("/api/settings/changepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password
                })
            })

            if(!resp.ok) {
                const respJson = await resp.json()
                setPasswordErrMsg(respJson.error)
                if(resp.status === 429) {
                    setPasswordErrMsg("You have been raitlimited")
                }
                setPasswordLoading(false)
                return
            }

            setPasswordSucess(true)
            setPasswordLoading(false)
        } catch(error) {
            setPasswordLoading(false)
            setPasswordErrMsg(error.toString())
        }
    }

    const handlePrivProfileSubmit = async (e) => {
        e.preventDefault()
        setPrivatePorfileLoading(true)
        setPrivatePorfileSucess(false)
        setPrivatePorfileErrMsg("")
        try {
            const resp = await fetch("/api/settings/changevisiblity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    privatePorfile: privatePorfile
                })
            })

            if(!resp.ok) {
                const respJson = await resp.json()
                setPrivatePorfileErrMsg(respJson.error)
                if(resp.status === 429) {
                    setPrivatePorfileErrMsg("You have been raitlimited")
                }
                setPrivatePorfileLoading(false)
                return
            }

            setPrivatePorfileSucess(true)
            setPrivatePorfileLoading(false)
        } catch(error) {
            setPrivatePorfileLoading(false)
            setPrivatePorfileErrMsg(error.toString())
        }
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-[40%] md:w-[17%] max-h-full flex flex-col shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] z-10"> 
                <Sidebar selected={"settings"}/>
            </div>
            <div className="w-[60%] md:w-[83%] h-full bg-[#edede9] flex flex-col items-center">
                <form onSubmit={handleEmailSubmit} className="flex flex-col w-2/3 xl:w-1/3 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-xl mt-10">
                    <div className="p-2 flex flex-col xl:flex-row space-x-2">
                        <input type="email" placeholder="New email..." className="w-[100%] xl:w-[70%] focus:outline-none" onChange={(e) => {setEmail(e.target.value)}}/>
                        {!emailLoading ? (
                            <button type="submit" className="w-[100%] xl:w-[30%] p-2 bg-purple-500 rounded-2xl font-bold text-white hover:cursor-pointer transition-transform duration-300 hover:scale-105">Set Email</button>
                        ) : (
                            <div className="justify-center items-center flex w-[100%] xl:w-[30%]">
                                <Loading/>
                            </div>
                        )}
                        
                    </div>
                    {emailErrMsg.length > 0 && (
                    <div className="p-2 bg-red-100 rounded-b-xl">
                        <p className="text-red-800">Error: {emailErrMsg}</p>
                    </div>
                    )}
                    {emailSuccess && (
                    <div className="p-2 bg-green-100 rounded-b-xl">
                        <p className="text-green-800">Success</p>
                    </div>
                    )}
                </form>
                <form onSubmit={handleUsernameSubmit} className="flex flex-col w-2/3 xl:w-1/3 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-xl mt-10">
                    <div className="p-2 flex space-x-2 flex-col xl:flex-row">
                        <input maxLength={MaxUsernameLen} type="text" placeholder="New username..." className="w-[100%] xl:w-[70%] focus:outline-none" onChange={(e) => {setUsername(e.target.value)}}/>
                        {!usernameLoading ? (
                            <button type="submit" className="w-[100%] xl:w-[30%] p-2 bg-purple-500 rounded-2xl font-bold text-white hover:cursor-pointer transition-transform duration-300 hover:scale-105">Set Username</button>
                        ) : (
                            <div className="justify-center items-center flex w-[100%] xl:w-[30%]">
                                <Loading/>
                            </div>
                        )}
                        
                    </div>
                    {usernameErrMsg.length > 0 && (
                    <div className="p-2 bg-red-100 rounded-b-xl">
                        <p className="text-red-800">Error: {usernameErrMsg}</p>
                    </div>
                    )}
                    {usernameSuccess && (
                    <div className="p-2 bg-green-100 rounded-b-xl">
                        <p className="text-green-800">Success</p>
                    </div>
                    )}
                </form>
                <form onSubmit={handlePasswordSubmit} className="flex flex-col w-2/3 xl:w-1/3 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-xl mt-10">
                    <div className="p-2 flex xl:flex-row flex-col space-x-2">
                        <input maxLength={MaxPassLen} type="password" placeholder="New password..." className="w-[100%] xl:w-[70%] focus:outline-none" onChange={(e) => {setPassword(e.target.value)}}/>
                        {!passwordLoading ? (
                            <button type="submit" className="w-[100%] xl:w-[30%] p-2 bg-purple-500 rounded-2xl font-bold text-white hover:cursor-pointer transition-transform duration-300 hover:scale-105">Set Password</button>
                        ) : (
                            <div className="justify-center items-center flex w-[100%] xl:w-[30%]">
                                <Loading/>
                            </div>
                        )}
                        
                    </div>
                    {passwordErrMsg.length > 0 && (
                    <div className="p-2 bg-red-100 rounded-b-xl">
                        <p className="text-red-800">Error: {passwordErrMsg}</p>
                    </div>
                    )}
                    {passwordSuccess && (
                    <div className="p-2 bg-green-100 rounded-b-xl">
                        <p className="text-green-800">Success</p>
                    </div>
                    )}
                </form>
                <form onSubmit={handlePrivProfileSubmit} className="flex flex-col w-2/3 xl:w-1/3 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] rounded-xl mt-10">
                    <div className="p-2 flex flex-col xl:flex-row items-center space-x-2">
                        <p className="text-xl">Private Profile</p>
                        <label className="flex items-center justify-between bg-white py-2 rounded-xl hover:cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="sr-only peer" id="privateToggle" checked={privatePorfile} onChange={() => setPrivateProfile(p => !p)}/>
                                <div className="w-14 h-8 bg-gray-200 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-6 transition-transform shadow"/>
                            </div>
                        </label>
                        {!privatePorfileLoading ? (
                            <button type="submit" className="w-[100%] xl:w-[30%] p-2 bg-purple-500 rounded-2xl font-bold text-white hover:cursor-pointer transition-transform duration-300 hover:scale-105">Set Privacy</button>
                        ) : (
                            <div className="justify-center items-center flex w-[100%] xl:w-[30%]">
                                <Loading/>
                            </div>
                        )}
                    </div>
                    {privatePorfileErrMsg.length > 0 && (
                    <div className="p-2 bg-red-100 rounded-b-xl">
                        <p className="text-red-800">Error: {privatePorfileErrMsg}</p>
                    </div>
                    )}
                    {privatePorfileSuccess && (
                    <div className="p-2 bg-green-100 rounded-b-xl">
                        <p className="text-green-800">Success</p>
                    </div>
                    )}
                </form>
            </div>
        </div>
    )
}