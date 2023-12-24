import { Link, NavLink, Outlet } from "react-router-dom";
import './Home.css'
import { useContext } from "react";
import { AuthContext } from "../../../Component/AuthProvider/AuthProvider";
import bannerVideo from '../../../../public/task banner.mp4'



const Home = () => {
    const { user, loading } = useContext(AuthContext)
    return (
        <div>
            {
                user ? <div className="flex">
                    <div className="w-2/12 py-3 text-center flex flex-col bg-blue-200 h-screen">
                        <NavLink className='text-lg font-bold p-2 mx-5 rounded-lg' to='/taskHome'>Home</NavLink>
                        <NavLink className='text-lg font-bold p-2 mx-5 rounded-lg' to='/taskFeed'>Feed</NavLink>
                    </div>
                    <div className="w-10/12">
                        <Outlet></Outlet>
                    </div>
                </div> :
                    <div className="flex flex-col md:flex-row lg:flex-row justify-between lg:mx-10 my-10 items-center">
                        <div className="lg:w-1/2 lg:mt-28 mr-10 lg:mr-24">
                            <h1 className="text-3xl font-bold mb-5">Task Quasar - Elevate Your <span className="text-blue-400">Productivity</span></h1>
                            <p className="font-medium text-slate-500">Welcome to Task Quasar, your ultimate destination for seamless task management and heightened productivity! Revolutionize the way you organize, collaborate, and accomplish your goals with our intuitive and feature-rich task management website.</p>
                            <Link to='/login' className="btn bg-blue-400 text-white hover:text-black my-5"><button>Explore</button></Link>
                        </div>
                        <div className="lg:w-1/2">
                            <video src={bannerVideo} width="400" height="300" autoPlay loop muted />
                        </div>
                    </div>
            }
            <div>
            </div>
        </div >
    );
};

export default Home;