
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Component/AuthProvider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;