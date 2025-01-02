import { useState } from 'react';
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";
import axios from 'axios';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('https://tripbangla.vercel.app/contact', formData)
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to send your message.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div className="container mx-auto p-6 mt-20">
            <Card className="p-6 shadow-lg">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4">
                    Contact Us
                </Typography>
                <form onSubmit={handleFormSubmit} className="mt-4">
                    <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    <Textarea label="Message" name="message" value={formData.message} onChange={handleInputChange} required />
                    <Button type="submit" className="mt-6 w-full btn">
                        Send Message
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ContactUs;
