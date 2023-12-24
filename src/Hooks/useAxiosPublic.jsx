import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-quasar-server-iota.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;