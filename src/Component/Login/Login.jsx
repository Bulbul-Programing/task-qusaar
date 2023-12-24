import { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import swal from "sweetalert";

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        const from = e.target
        const email = from.email.value
        const password = from.password.value
        login(email, password)
            .then(() => {
                swal('success', 'Login Successfully', 'success')
                navigate(location?.state ? location.state : '/')
            })
            .catch(() => swal('Error', 'Something is Wrong', 'error'))
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((res) => {
                navigate('/taskHome')
                swal('success', 'Register Successfully', 'success')
            })
            .catch()
    }

    return (
        <div className="flex gap-x-10 my-20 items-center mx-20">
            <div>
                <img className="w-[500px]" src="https://i.ibb.co/GdSNyf8/privacy-policy-concept-illustration-114360-7853.jpg" alt="" />
            </div>
            <div className="w-[450px] shadow-2xl p-10 rounded-3xl">
                <h1 className="text-3xl font-bold text-center">Login Now</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="px-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" name="email" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="px-4 mb-3 outline-none border-2 focus:border-blue-400 py-3 rounded-lg text-slate-500" name="password" required />
                    </div>
                    <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Login" />
                </form>
                <div>
                    <p className='mt-3 text-center mb-2'>New hare <Link to='/register' className='text-blue-500 font-bold'>Create a New Account</Link> OR <Link to='/' className="font-bold text-blue-500">Go Home</Link></p>
                    <p className='text-center'>Or Sign in With</p>
                    <div className='flex justify-center gap-x-4'>
                        <button onClick={handleGoogleLogin}><FaGoogle className=' mt-2 text-3xl text-blue-500'></FaGoogle></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;