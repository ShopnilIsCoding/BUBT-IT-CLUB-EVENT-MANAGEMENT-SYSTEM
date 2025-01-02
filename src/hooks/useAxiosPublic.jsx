import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://tripbangla.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;