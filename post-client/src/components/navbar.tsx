import { useState } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom"

function Navbar() {
    const [nav, setNav] = useState(false)
    const navElements = [
        { id: 1, name: "Home", path: "/home" },
        { id: 2, name: "Profile", path: "/editprofile" },
        { id: 3, name: "ownposts", path: "/ownposts" },
        { id: 4, name: "Logout", path: "/logout" },
                { id: 5, name: "AddPost", path: "/newPost" }

    ]

    const handleNavToggle = () => {
        setNav(!nav)
    }

    return (
        <div className="w-full bg-gray-800 text-white p-4 flex justify-center items-center relative">
            <ul className="hidden md:flex">
                {navElements.map((element) => (
                    <li key={element.id} className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
                        <Link to={element.path}>{element.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Hamburger Icon - only on small screens */}
            <div onClick={handleNavToggle} className="md:hidden absolute  right-[42%] z-50">
                {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
            </div>

            {/* Mobile menu */}
            <ul
                className={
                    nav
                        ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-40'
                        : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-40'
                }
            >
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>POSTS.</h1>
                {navElements.map(item => (
                    <li
                        key={item.id}
                        className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
                    >
                        <Link to={item.path} onClick={handleNavToggle}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar
