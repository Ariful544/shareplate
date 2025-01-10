import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const emailFirstLetter = user?.email.charAt(0).toUpperCase();
    const links = <>
        <li><NavLink className={({ isActive }) => isActive ? "bg-white text-gray-700 rounded-3xl py-2 px-4" : "bg-none text-white"} to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? "bg-white text-gray-700 rounded-3xl py-2 px-4" : "bg-none text-white"} to="/available-foods">Available Foods</NavLink></li>
    </>
    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged out successful")
                navigate('/')
            })
    }
    return (
        <div className="navbar md:px-[105px] max-w-screen-2xl bg-[#E67E22] sticky top-0 z-50 flex items-center py-2 text-white mx-auto font-open-sans">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-primary rounded-box z-[50] mt-3 w-52 p-2 shadow">
                    {links}
                </ul>
            </div>
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost hover:bg-transparent md:text-2xl text-xl">SharePlate</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <ul className="md:flex font-semibold hidden mr-4 items-center space-x-4">
                        {links}
                    </ul>
                </div>
                <div className="flex items-center">
                    {
                        user ?
                            <div className="dropdown dropdown-end ">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {
                                            user.photoURL !== null ? <>
                                                <img referrerPolicy="no-referrer"
                                                    alt={user?.displayName}
                                                    src={user?.photoURL} />

                                            </> :
                                                <>
                                                    <p className='bg-red-500 w-full h-full text-white font-bold text-3xl'>{emailFirstLetter}</p>
                                                </>
                                        }
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content font-semibold text-white text-lg bg-primary rounded-box z-[50] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile
                                        </Link>
                                    </li>
                                    <li><Link to="/add-food">Add Food</Link></li>
                                    <li><Link to="/manage-my-foods">Manage My Foods</Link></li>
                                    <li><Link to="/my-foods-request">My Food Request</Link></li>
                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </div> :
                            <div>
                                <ul className="font-semibold text-white flex items-center space-x-4">
                                    <li><NavLink className={({ isActive }) => isActive ? "bg-white text-gray-700 rounded-3xl py-2 px-4" : "bg-none text-white"} to="/signup">SignUp</NavLink></li>
                                    <li><NavLink className={({ isActive }) => isActive ? "bg-white text-gray-700 rounded-3xl py-2 px-4" : "bg-none text-white"} to="/login">Login</NavLink></li>
                                </ul>
                            </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default Navbar;