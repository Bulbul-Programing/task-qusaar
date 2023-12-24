import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import swal from "sweetalert";

const Navbar = () => {

    const { user, loading,logOut } = useContext(AuthContext)

    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-dots  loading-lg"></span>
            </div>
        )
    }

    const logout = () => {
        logOut()
        .then(swal('success', 'logOut Success', 'success'))
    }

    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <img className="w-[60px]" src="https://i.ibb.co/17hp6Lv/New-Project-1.png" alt="" />
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold"><span className="text-blue-400">Task</span> Quasar</h1>
            </div>

            <div className="navbar-end">
                <p className="text-lg font-bold mr-3">{user?.displayName}</p>
                <img className="w-[50px] rounded-full mr-3 " src={user?.photoURL} alt="" />
                {
                    user ? <button onClick={logout} className="btn bg-blue-400 text-white font-bold hover:text-black">Log out</button> : <Link to='/login' className="btn bg-blue-400 text-white font-bold hover:text-black"><button>Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;