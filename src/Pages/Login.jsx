import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import SocialLogin from "../Components/SocialLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photoUrl: ''
    });

    const {user, signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    if(user)
        {
            navigate('/');
        }

    const from = location.state?.from?.pathname || "/";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        signIn(formData.email, formData.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                title: 'User Login Successful.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            navigate(from, { replace: true });
        })
        
    };

    return (
        <div className="relative w-full h-screen">
            <img
                src="/bubt it club.png" 
               
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex items-center justify-center h-full bg-gray-800 bg-opacity-50">
                <Card color="transparent" shadow={false} className="glass p-6">
                    <Typography variant="h4" color="black">
                        Log In
                    </Typography>
                    <Typography color="white" className="mt-1 font-normal">
                        Welcome Back! Enter your details to Login.
                    </Typography>
                    <form className="mt-4 mb-2 w-60 max-w-screen-lg sm:w-80 mx-auto" onSubmit={handleLogin}>
                        <div className="mb-1 flex flex-col gap-3">
                        
                            <Typography variant="h6" color="black" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="!border-t-black-200 focus:!border-t-white"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} required
                            />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="!border-t-black-200 focus:!border-t-white"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} required
                            />
                        </div>
                        <Button className="mt-3 glassbg" fullWidth type="submit">
                            Log In
                        </Button>
                        
                        <Typography color="white" className="mt-2 text-center font-normal">
                            Don't have an account?{" "}
                            <Link to={'/signup'} className="font-medium text-gray-900">
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                    {/* <h1 className="text-center text-white mt-1">------- OR -------</h1>
                        <SocialLogin></SocialLogin> */}
                </Card>
            </div>
        </div>
    );
};

export default Login;
