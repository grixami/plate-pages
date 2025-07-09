"use client"

export default function UserRecipeCard({ recipe, callbackDelete }) {
    return (
        <div className="flex flex-col shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white rounded-lg h-[25vh]  transition-transform duration-300 hover:scale-105 hover:-translate-y-3">
            <div className=" flex space-x-2 pt-2 pr-2 justify-end">
                <a href={`/recipe/view?id=${recipe.id}`} className="bg-purple-400 p-2 text-white rounded-2xl transition-all duration-200 ease-in-out hover:bg-purple-600 hover:cursor-pointer">View</a>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-center text-2xl">{recipe.title}</p>
                <p className="text-center py-2 px-4">{recipe.description}</p>
                <p>{recipe.cooktime} mins to cook</p>
            </div>
        </div>
    )
}