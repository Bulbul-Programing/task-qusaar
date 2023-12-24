import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
const imageHostingKey = import.meta.env.VITE_HOSTING_KEY
const imageHosting = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`
const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { signUp, userUpdateProfile, user, googleLogin } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHosting, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },)
        // console.log(data);
        const imageURL = res.data.data.display_url
        // console.log(res.data.data.display_url,);

        if (data.password.length < 6) {
            return setError('Please set Password minimum 6 character')
        }
        else if (!/[A-Z]/.test(data.password)) {
            return setError('Please enter minimum one capital later')
        }
        else if (!/[@#$%^&]/.test(data.password)) {
            return setError('Please enter minimum one special character')
        }
        else {
            signUp(data.email, data.password)
                .then(res => {
                    if (res.user.accessToken) {
                        userUpdateProfile(data.name, imageURL)
                            .then(res => {
                                const userData = { name: data.name, email: data.email, image: imageURL, role: 'user' }
                                axiosPublic.post('/users', userData)
                                    .then(res => {
                                        setError(''),
                                            swal('success', 'Register Successfully', 'success'),
                                            navigate(location?.state ? location.state : '/')

                                    })
                            })
                    }
                })
                .catch(error => swal('Error', 'Account is already add.', 'error'))
        }

    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((res) => {
                const userData = { name: res.user.displayName, email: res.user.email, image: res.user.photoURL, role: 'user' }
                axiosPublic.post('/users', userData)
                    .then(res => {
                        swal('success', 'Register Successfully', 'success'),
                            navigate(location?.state ? location.state : '/taskHome')

                    })

            })
            .catch(() => swal('Error', 'Something is Wrong', 'error'))
    }

    return (
        <div className="flex flex-row-reverse gap-x-10 my-20 items-center mx-20">
            <div>
                <img className="w-[500px]" src="https://i.ibb.co/GdSNyf8/privacy-policy-concept-illustration-114360-7853.jpg" alt="" />
            </div>
            <div className="w-[450px] shadow-2xl p-10 rounded-3xl">
                <h1 className="text-3xl font-bold text-center">Register Now</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Name</span>
                        </label>
                        <input type="text" placeholder="Name" className="px-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" {...register('name')} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Image</span>
                        </label>
                        <input type="file" placeholder="Image" className="px-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" {...register('image')} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="px-4 outline-none py-3 border-2 focus:border-blue-400 rounded-lg text-slate-500" {...register('email')} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="px-4 mb-3 outline-none border-2 focus:border-blue-400 py-3 rounded-lg text-slate-500" {...register('password')} required />
                    </div>
                    <p className="text-red-500 my-2 font-semibold">{error}</p>
                    <input className='btn bg-blue-500 w-full text-white hover:text-black' type="submit" value="Register" />
                </form>
                <div>
                    <p className='mt-3 text-sm text-center font-medium mb-2'>Already have account <Link to='/login' className='text-blue-500 font-bold'>Please Login</Link> OR <Link to='/' className="font-bold text-blue-500">Go Home</Link></p>
                    <p className='text-center font-medium'>Or Sign in With</p>
                    <div className='flex justify-center gap-x-4'>
                        <button onClick={handleGoogleLogin}><FaGoogle className=' mt-2 text-3xl text-blue-500'></FaGoogle></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;