import { useState } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useGetLoggedInUser } from "../logic/useUsers";
import { useGetAllPost } from "../logic/usePosts";
import LogoutButton from "./logutBtn";
import PostCard from "./postCard";
import ProfileDropdown from "./profileDropdown";
import { FaHome, FaAddressBook } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";



function Navbar() {
    const { data } = useGetLoggedInUser();
    const [nav, setNav] = useState(false)
    const navElements = [
        { id: 1, name: "Home", path: "/home", icon: <FaHome /> },
        { id: 2, name: "Profile", path: "/editprofile", icon: <CgProfile /> },
        { id: 3, name: "ownposts", path: "/ownposts" },

        { id: 5, name: "AddPost", path: "/newPost" },
        { id: 4, name: "Sign out", path: "/logout", icon: <RiLogoutBoxRLine /> },

    ]

    const handleNavToggle = () => {
        setNav(!nav)
    }

    return (
        <div className="w-full bg-gray-800 text-white p-4 flex items-center relative">
            <div className="w-full bg-gray-800 text-white p-4 flex items-center relative">

                {/* Bal oldal – üres hely, hogy a menü középre kerüljön */}
                <div className="flex-1"></div>

                {/* Középső rész – navbar elemek */}
                <ul className="hidden md:flex justify-center">
                    {navElements.map((element) => (
                        <li
                            key={element.id}
                            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
                        >
                            <Link to={element.path}>{element.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* Jobb oldal – ProfileDropdown */}


                {/* Hamburger ikon mobilra */}
                <div
                    onClick={handleNavToggle}
                    className="md:hidden fixed right-4 top-4 z-50 cursor-pointer"
                >
                    {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                </div>

                {/* Mobil menü */}
                {nav && (
                    <div className="fixed inset-0 bg-black z-40 flex flex-col p-6 ">

                        <div className="ml-4 flex gap-4 font-bold">
                            <span>Logged In As:</span>
                            <span className="">{data?.name}</span>
                        </div>
                        <ul className="flex flex-col mt-8">
                            {navElements.map((element) => (
                                <li
                                    key={element.id}
                                    className="p-4 hover:bg-[#00df9a] rounded-xl my-2 cursor-pointer duration-300 text-lg hover:text-black"
                                    onClick={handleNavToggle}
                                >
                                    <Link
                                        to={element.path}
                                        className="flex items-center gap-3 p-4 text-lg"
                                    >
                                        {element.icon && (
                                            <span className="text-xl">{element.icon}</span>
                                        )}
                                        <span>{element.name}</span>
                                    </Link>
                                    <hr className="border-gray-700 mx-4" />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>

        </div>
    )
}

export default Navbar
