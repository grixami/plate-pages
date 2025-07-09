"use client"

export default function PlainRecipe({ title, desc, mins }) {
    return (
        <div className="flex justify-center shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] h-75 w-75 bg-white rounded-lg transition-transform duration-300 hover:scale-105 hover:-translate-y-3">
            <div className="flex flex-col items-center justify-center">
                <p className="text-center text-2xl text-black">{title}</p>
                <p className="text-center py-2 px-4 text-black">{desc}</p>
                <p className="text-black">{mins} mins to cook</p>
            </div>
        </div>
    )
}