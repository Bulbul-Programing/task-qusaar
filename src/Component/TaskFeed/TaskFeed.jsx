import moment from "moment";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from "@tanstack/react-query";


const TaskFeed = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['totalTask'],
        queryFn: async () => {
            const res = await axiosSecure(`/taskWithStatus/task/${user.email}`)
            return res.data
        }
    })
    const { data: pending, refetch:pendingReload} = useQuery({
        queryKey: ['pendingTask'],
        queryFn: async () => {
            const res = await axiosSecure(`/taskPending/${user.email}`)
            return res.data
        }
    })
    const { data: complete,refetch:completeReload} = useQuery({
        queryKey: ['complete'],
        queryFn: async () => {
            const res = await axiosSecure(`/taskComplete/${user.email}`)
            return res.data
        }
    })

    const handleStatus = (status, id) => {
        axiosSecure.put(`/statusUpdate/${id}`, {status})
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch()
                pendingReload()
                completeReload()
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        const date = moment().format('l')
        const data = { email: user.email, status: 'task', name: user.displayName, profile: user.photoURL, title: title, description: description, date: date, }
        axiosSecure.post('/addTask', data)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('successfully add task')
                    e.target.reset()
                    refetch()
                }
            })
            .catch(error => console.log(error))
    }

    if (isLoading || loading) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    return (
        <div className="mx-10 my-10">
            <div> <ToastContainer />
                <button className="btn hover:text-black  text-white font-bold bg-blue-400 px-4 py-2 rounded-lg" onClick={() => document.getElementById('my_modal_5').showModal()}>Add Task</button>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box relative">
                        <h3 className="font-bold text-lg">Add New Task</h3>
                        <p className="py-4">Please Provide title and description for create a new task.</p>
                        <form onSubmit={handleSubmit}>
                            <input className="p-3 w-full border-2 mb-4 font-semibold rounded-lg focus:outline-blue-400" type="text" placeholder="Title" name="title" id="" required />
                            <textarea className="p-3 w-full border-2 mb-4 font-semibold rounded-lg focus:outline-blue-400" name="description" placeholder="Description" id="" cols="30" required rows="3"></textarea>
                            <input className="btn text-lg font-bold mr-3 bg-blue-500 text-white hover:text-black" type="submit" />
                        </form>
                        <div className="modal-action absolute left-36 bottom-[25px]">
                            <form method="dialog">
                                {/* <button onClick={handleSubmit} className="btn text-lg font-bold mr-3 bg-blue-500 text-white hover:text-black">Submit</button> */}
                                <button className="btn text-lg mr-2">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <input type="text" className="p-3 ml-10 border-2 font-semibold rounded-lg focus:outline-blue-400" placeholder="Search Hare" name="" id="" />
            </div>
            <div className="flex justify-between gap-x-5 pt-10">
                <div className=" bg-slate-200 w-1/3  shadow-xl rounded-lg p-5 ">
                    <h1 className="bg-orange-400 px-10 py-1 inline-block text-white font-bold rounded-lg">Task</h1>
                    <div>
                        {
                            tasks.map(task =>
                                <div key={task._id} className="p-2 shadow-lg my-4 rounded-lg">
                                    <h1 className="text-lg font-bold p-2 shadow-md rounded-lg">{task.title}</h1>
                                    <p className="my-3">{task.description.slice(0, 50)}</p>

                                    <div className="flex border-t-2 border-slate-300 py-2 rounded-sm items-center justify-between">
                                        <div className="flex items-center gap-x-3">
                                            <img className="w-[30px] h-[30px] rounded-full" src={task.profile} alt="" />
                                            <p className="font-semibold">{task.name}</p>
                                        </div>
                                        <h1 className="font-semibold text-sm">{task.date}</h1>
                                    </div>
                                    <div>
                                        <button onClick={()=>handleStatus('pending',task._id)} className="bg-blue-400 font-semibold py-[2px] px-2 rounded-lg text-white my-2 cursor-pointer hover:bg-blue-500 mr-4">Pending</button>
                                        <button onClick={()=>handleStatus('complete',task._id)} className="bg-green-400 font-semibold py-[2px] px-2 rounded-lg my-2 cursor-pointer hover:bg-green-500">Complete</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="bg-slate-200 shadow-xl w-1/3  rounded-lg p-5 ">
                    <h1 className="bg-blue-400 px-10 py-1 inline-block text-white font-bold rounded-lg">Pending</h1>
                    <div>
                        {
                            pending?.map(pendingTask =>
                                <div key={pendingTask._id} className="p-2 shadow-lg my-4 rounded-lg">
                                    <h1 className="text-lg font-bold p-2 shadow-md rounded-lg">{pendingTask.title}</h1>
                                    <p className="my-3">{pendingTask.description.slice(0, 50)}</p>

                                    <div className="flex border-t-2 border-slate-300 py-2 rounded-sm items-center justify-between">
                                        <div className="flex items-center gap-x-3">
                                            <img className="w-[30px] h-[30px] rounded-full" src={pendingTask.profile} alt="" />
                                            <p className="font-semibold">{pendingTask.name}</p>
                                        </div>
                                        <h1 className="font-semibold text-sm">{pendingTask.date}</h1>
                                    </div>
                                    <div>
                                        <button onClick={()=>handleStatus('complete',pendingTask._id)} className="bg-green-400 font-semibold py-[2px] px-2 rounded-lg my-2 cursor-pointer hover:bg-green-500">Complete</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="bg-slate-200 shadow-xl  w-1/3  rounded-lg p-5">
                    <h1 className="bg-green-400 px-10 py-1 inline-block  font-bold rounded-lg">Complete</h1>
                    <div>
                        {
                            complete?.map(completeTask =>
                                <div key={completeTask._id} className="p-2 shadow-lg my-4 rounded-lg">
                                    <h1 className="text-lg font-bold p-2 shadow-md rounded-lg">{completeTask.title}</h1>
                                    <p className="my-3">{completeTask.description.slice(0, 50)}</p>

                                    <div className="flex border-t-2 border-slate-300 py-2 rounded-sm items-center justify-between">
                                        <div className="flex items-center gap-x-3">
                                            <img className="w-[30px] h-[30px] rounded-full" src={completeTask.profile} alt="" />
                                            <p className="font-semibold">{completeTask.name}</p>
                                        </div>
                                        <h1 className="font-semibold text-sm">{completeTask.date}</h1>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskFeed;