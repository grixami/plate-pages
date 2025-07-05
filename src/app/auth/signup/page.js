"use client"

import EmailInput from "@/app/components/forms/emailinput";
import Loading from "@/app/components/forms/loading";
import PasswordInput from "@/app/components/forms/passwordinput";
import TextInput from "@/app/components/forms/textinput";
import { useState } from "react";

export default function Signup() {
    
    const [registerLoading, setRegisterLoading] = useState(false)

    const [signupSuccess, setSignupSuccess] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    
    const registerUser = async (e) => {
        e.preventDefault();
        setErrorMsg("")
        setSignupSuccess(false)

        setRegisterLoading(true)

        const form = e.target

        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            const resp = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            })
            if(!resp.ok) {
                const respjson = await resp.json()
                setErrorMsg(respjson.error)
                if(resp.status == 429) {
                    setErrorMsg("You have been ratelimited")
                }
                setRegisterLoading(false)
                return
            }
            setRegisterLoading(false)
            setSignupSuccess(true)

        } catch {
            setRegisterLoading(false)
            setErrorMsg("Unknown Error")
        }
    }


    return (
        <div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 px-10 b shadow-2xl rounded-2xl w-1/3">
                <h1 className="font-semibold text-4xl text-center">Sign Up</h1>
                <p className="text-center text-sm font-extralight">Sign up to continue</p>
                <form className="mt-6 flex flex-col space-y-10" onSubmit={registerUser}>
                        <EmailInput id="email" name="email" placeholder={"email..."}/>
                        <TextInput maxLen={15} id="username" name="username" placeholder={"username..."} pattern={"^[A-Za-z0-9_]*$"}/>
                        <PasswordInput maxLen={40} id="password" name="password" placeholder={"password..."}/>
                        {!registerLoading ? (
                            <button type="submit" className=" bg-blue-600 py-2 text-white rounded-2xl transition-all ease-in-out duration-400 hover:scale-105 hover:cursor-pointer hover:bg-blue-900">Sign up</button>
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

                        {signupSuccess && (
                            <div className="flex justify-center">
                                <p className="text-green-800 bg-green-100 p-2 rounded-xl">Success, please <a href="/auth/signin" className="text-blue-600">Sign in</a></p>
                            </div>
                        )}
                        <p className="text-center text-sm">Already have an account? <a href="/auth/signin" className="text-blue-600">Sign in</a></p>
                </form>
            </div>
        </div>
    )
}