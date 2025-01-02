import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import SocialLogin from "../Components/SocialLogin";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photoUrl: '',
        points: 0
    });

    const {user, createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    if(user)
        {
            navigate('/');
        }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        // Regex to match the BUBT email format
        const emailRegex = /^[0-9]+@cse\.bubt\.edu\.bd$/;
    
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Invalid Email',
                text: 'You must use a valid BUBT-provided email (e.g., 22234103166@cse.bubt.edu.bd).',
                showConfirmButton: true
            });
            return; // Stop the form submission
        }
    
        console.log(formData);
        createUser(formData.email, formData.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(formData.name, formData.photoUrl)
                    .then(() => {
                        const userInfo = {
                            name: formData.name,
                            email: formData.email,
                            role: "student",
                            status: "Verified",
                            point: 0
                        };
                        axios.put('http://localhost:5000/users', userInfo)
                            .then(res => {
                                if (res.data.upsertedCount > 0) {
                                    console.log('User added to the database');
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Sign Up successful!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => {
                                console.error('Error adding user to the database:', error);
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: 'Failed to add user to the database.',
                                    text: error.message,
                                    showConfirmButton: true
                                });
                            });
                    })
                    .catch(error => {
                        console.error('Error updating user profile:', error);
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Failed to update user profile.',
                            text: error.message,
                            showConfirmButton: true
                        });
                    });
            })
            .catch(error => {
                console.error('Error creating user:', error);
                if (error.code === 'auth/network-request-failed') {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Network Error',
                        text: 'Please check your internet connection and try again.',
                        showConfirmButton: true
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Failed to create user.',
                        text: error.message,
                        showConfirmButton: true
                    });
                }
            });
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
                        Sign Up
                    </Typography>
                    <Typography color="white" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form className="mt-4 mb-2 w-60 max-w-screen-lg sm:w-80 mx-auto" onSubmit={onSubmit}>
                        <div className="mb-1 flex flex-col gap-3">
                            <Typography variant="h6" color="black" className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="!border-t-black-200 focus:!border-t-white"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} required
                            />
                            <Typography variant="h6" color="black" className="-mb-3">
                                Your Photo URL
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="https://example.com/photo.jpg"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleInputChange}
                                className="!border-t-black-200 focus:!border-t-white"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }} required
                            />
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
                        <Button className="mt-3" fullWidth type="submit">
                            Sign Up
                        </Button>
                       
                        <Typography color="white" className="mt-2 text-center font-normal">
                            Already have an account?{" "}
                            <Link to={'/login'} className="font-medium text-gray-900">
                                Sign In
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

export default Signup;
