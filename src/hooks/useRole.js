import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
    const {user,loading}=useAuth();
    console.log(user)
    const {data:role='',isLoading}=useQuery({
        queryKey:['role'],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            const response=await axios.get(`http://localhost:5000/user/${user?.email}`)
            return response.data.role
        },
    })
    console.log("role",role)
    return [role , isLoading];
};

export default useRole;