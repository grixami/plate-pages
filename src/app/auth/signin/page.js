"use client"

import EmailInput from "@/app/components/forms/emailinput";
import Loading from "@/app/components/forms/loading";
import PasswordInput from "@/app/components/forms/passwordinput";
import { useState } from "react";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

export default function Signin() {
    const [signinloading, setSigninLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const router = useRouter()

    const signinUser = async (e) => {
        try {
            e.preventDefault();
            setErrorMsg("")
            setSigninLoading(true)

            const form = e.target

            const email = form.email.value
            const password = form.password.value

            const resp = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const respJson = await resp.json()

            if(!resp.ok) {
                setErrorMsg(respJson.error)
                if(resp.status == 429) {
                    setErrorMsg("You have been ratelimited")
                }
                setSigninLoading(false)
                return
            }
            Cookies.set("token", respJson.token)
            router.replace("/dashboard")
            setSigninLoading()

        } catch {
            setErrorMsg("Unknown Error")
        }
    }

    return (
        <div className="w-screen h-screen">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 px-10 b shadow-2xl rounded-2xl w-1/3">
                <h1 className="font-semibold text-4xl text-center">Sign In</h1>
                <p className="text-center text-sm font-extralight">Sign In to continue</p>
                <form className="mt-6 flex flex-col space-y-10" onSubmit={signinUser}>
                        <EmailInput id="email" name="email" placeholder={"email..."}/>
                        <PasswordInput maxLen={40} id="password" name="password" placeholder={"password..."}/>
                        {!signinloading ? (
                            <button type="submit" className=" bg-blue-600 py-2 text-white rounded-2xl transition-all ease-in-out duration-400 hover:scale-105 hover:cursor-pointer hover:bg-blue-900">Sign in</button>
                        ) : (
                            <div className="flex justify-center">
                                <Loading/>
                            </div>
                        )}
                        {errorMsg.length > 0 && (
                            <div className="flex justify-center ">
                                <p className="bg-red-100 p-2 rounded-xl text-red-800 ">Error: {errorMsg}</p>
                            </div>
                        )}
                        <p className="text-center text-sm">Dont have an account? <a href="/auth/signup" className="text-blue-600">Sign up</a></p>
                </form>
            </div>
        </div>
    )
}