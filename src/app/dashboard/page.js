import Image from "next/image";
import { Sidebar } from "../components/sidebar";

export default function Dashboard() {
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
                        {Array.from({ length: 80 }).map((_, i) => (
                            <div key={i} className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] flex flex-col bg-white h-[25vh] rounded-lg items-center justify-center transition-transform duration-300 hover:cursor-pointer hover:scale-105 hover:-translate-y-3">
                                <p className="text-center text-2xl">Recipe {i + 1}</p>
                                <p className="description">description</p>
                                <p>{60} mins to cook</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}