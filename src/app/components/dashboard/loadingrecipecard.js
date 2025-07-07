"use client"

export default function LoadingRecipeCard() {
    return (
        <div className="relative  flex flex-col shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white rounded-lg h-[25vh] transition-transform duration-300 hover:scale-105 hover:-translate-y-3 cursor-pointer ">
            <div className="flex-1 flex flex-col items-center justify-center gap-y-2">
                <div className="w-3/4 h-8 bg-gray-300 rounded-2xl animate-pulse" />
                <div className="w-5/6 h-6 bg-gray-300 rounded-2xl animate-pulse" />
                <div className="w-1/2 h-6 bg-gray-300 rounded-2xl animate-pulse" />
            </div>
        </div>
    )
}