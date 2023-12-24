import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import swal from "sweetalert";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const TaskHome = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [updateTask, setUpdateTask] = useState({})

    const { data: AllTask, isLoading, refetch } = useQuery({
        queryKey: ['homeTask'],
        queryFn: async () => {
            if (user) {
                const res = await axiosSecure(`/totalTask/${user.email}`)
                return res.data
            }
        }
    })

    const openModal = (id) => {
        document.getElementById('my_modal_5').showModal()
        axiosSecure.get(`/singleTask/${id}`)
        .then(res => setUpdateTask(res.data))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const date = moment().format('l')
        const form = e.target
        const title = form.title.value
        const description = form.description.value
        const updateData = { email: user.email, name: user.displayName, profile: user.photoURL, title: title, description: description, date: date, modify:true }
        axiosSecure.put(`/updateTask/${updateTask._id}`, updateData)
        .then(res => {
            if(res.data.modifiedCount > 0){
                toast.success('Update successfully')
                refetch()
                e.target.reset()
            }
        })
    }


    const handelDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.delete(`/taskDelete/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                swal('success', 'successfully delete', 'success')
                                refetch()
                            }
                        })
                } else {

                }
            });
    }

    if (loading || isLoading) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        )
    }

    return (
        <div><ToastContainer />
            <div className="flex gap-x-10 p-10">
                <div className="bg-blue-500 w-[200px] text-white px-5 p-3 rounded-lg">
                    <h1 className="text-2xl font-semibold mb-2">Total Task</h1>
                    <h2 className="text-3xl font-bold">{AllTask.length}</h2>
                </div>
                <div className="bg-red-400 w-[200px] text-white px-5 p-3 rounded-lg">
                    <h1 className="text-2xl font-semibold mb-2">Complete Task</h1>
                    <h2 className="text-xl font-bold">0</h2>
                </div>
            </div>
            <div className="mx-10 w-1/2">
                <div>
                    <h1 className="text-2xl font-bold my-5">All Task</h1>
                </div>
                <div>
                    {
                        AllTask.map((task, index) =>
                            <div key={index} className="shadow-md p-4 rounded-lg my-5 flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-medium">{task.title}</h1>
                                    <p>{task.description.slice(0, 20)}...</p>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <button className="btn hover:text-black  text-white font-bold bg-blue-400 px-4 py-2 rounded-lg" onClick={() => openModal(task._id)}>Update</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box relative">
                                            <h3 className="font-bold text-lg">Update Task</h3>
                                            <p className="py-4">Please Provide title and description for update task.</p>
                                            <form onSubmit={handleUpdate}>
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
                                    <button onClick={() => handelDelete(task._id)} className="btn bg-red-400 text-white">Delete</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskHome;