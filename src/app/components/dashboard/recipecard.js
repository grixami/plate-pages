"use client"

export default function RecipeCard({ recipe, callbackDelete }) {
    return (
        <div className="flex flex-col shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white rounded-lg text-center transition-transform duration-300 hover:scale-105 hover:-translate-y-3">
            <div className="flex flex-col space-x-2 pt-2 lg:pr-2 justify-end lg:flex-row space-y-2 lg:space-y-0">
                <a href={`/dashboard/editrecipe?id=${recipe.id}`} className="bg-purple-400 p-2 w-full lg:w-auto text-white rounded-2xl transition-all duration-200 ease-in-out hover:bg-purple-600 hover:cursor-pointer">Edit</a>
                <a href={`/recipe/view?id=${recipe.id}`} className="bg-purple-400 p-2 text-center w-full lg:w-auto text-white rounded-2xl transition-all duration-200 ease-in-out hover:bg-purple-600 hover:cursor-pointer">View</a>
                <button className="bg-red-400 p-2 text-white rounded-2xl transition-all duration-200 ease-in-out hover:bg-red-600 hover:cursor-pointer" onClick={() => callbackDelete(recipe.id)}>Delete</button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-center text-2xl">{recipe.title}</p>
                <p className="text-center py-2 px-4">{recipe.description}</p>
                <p>{recipe.cooktime} mins to cook</p>
            </div>
        </div>
    )
}