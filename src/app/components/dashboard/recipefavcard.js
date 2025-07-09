"use client"

import Image from "next/image"

export default function RecipeFavCard({ recipe, toggleFavorite }) {
    return (
        <div className="flex flex-col shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.3)] bg-white rounded-lg h-[25vh]"> {/* Removed animation when hovered on so the star hover animation looks better */}
            <div className="flex pt-2 pr-2 justify-end space-x-2">
                <a href={`/recipe/view?id=${recipe.id}`} className="bg-purple-400 p-2 text-white rounded-2xl transition-all duration-200 ease-in-out hover:bg-purple-600 hover:cursor-pointer">View</a>
                {recipe.isFavorite ? (
                <Image
                    className="transition-transform duration-300 ease-in-out hover:scale-115 hover:-rotate-15 hover:cursor-pointer"
                    onClick={() => toggleFavorite(recipe.id)}
                    src={"/assets/icon/star.svg"}
                    alt="star"
                    width={40}
                    height={40}
                    />
                ) : (
                <Image
                    className="transition-transform duration-300 ease-in-out hover:scale-115 hover:-rotate-15 hover:cursor-pointer"
                    onClick={() => toggleFavorite(recipe.id)}
                    src={"/assets/icon/nostar.svg"}
                    alt="star"
                    width={40}
                    height={40}
                    />
                )}
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-center text-2xl">{recipe.title}</p>
                <p className="text-center py-2 px-4">{recipe.description}</p>
                <p>{recipe.cooktime} mins to cook</p>
            </div>
        </div>
    )
}