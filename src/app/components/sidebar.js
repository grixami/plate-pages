import Image from "next/image"
import Link from "next/link"

export function Sidebar({ selected }) {
    return (
        <>
        <Link href="/" className="h-[20%] flex items-center justify-center space-x-2 hover:cursor-pointer">
            <Image
                src={"/assets/icon/plate.svg"}
                alt="icon"
                width={40}
                height={40}
                />
            <h1 className="text-center font-semibold text-4xl">Plate pages</h1>
        </Link>
        <div className="h-[80%] flex flex-col items-center">
            <ul className="space-y-[30%]">
                <a href="/dashboard" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "home" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/home.svg"}
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl font-bold">Home</p>
                </a>
                <a href="/dashboard/create" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "create" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/notepad.svg"}
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl">Create Recipe</p>
                </a>
                <a href="/dashboard/generate" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "generate" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/robot.svg"}
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl">Generate Recipe</p>
                </a>
                <a href="/explore" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "explore" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/compass.svg"}
                    className="-scale-x-100" // flips the image (x axis) so that the compass looks more natural
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl">Explore</p>
                </a>
                <a href="/groups" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "groups" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/people.svg"}
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl">groups</p>
                </a>
                <a href="/dashboard/favorites" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "fav" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/heart.svg"}
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl">Favorites</p>
                </a>
                <a href="/dashboard/settings" className={`items-center space-x-2 p-2 rounded-xl hover:cursor-pointer ${selected == "settings" ? (" bg-blue-300 inline-flex") : ("flex opacity-50 ")}`}>
                    <Image
                    src={"/assets/icon/cog.svg"}
                    alt=""
                    width={30}
                    height={30}
                    />
                    <p className="text-xl">Settings</p>
                </a>
            </ul>
        </div>
        </>
    )
}