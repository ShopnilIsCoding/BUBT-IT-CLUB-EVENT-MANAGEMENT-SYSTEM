import { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
    Select,
    Option
} from "@material-tailwind/react";
import axios from 'axios';
import Swal from 'sweetalert2';

const AddPackageForm = () => {
    const [formData, setFormData] = useState({
        eventTitle: '',
        eventImageUrl: '',
        eventDetails: '',
        registrationDeadline: '',
        registrationFee: '',
        eventTimeline: [
            { day: '', time: '', activity: '' }
        ], // Initialize with a single timeline field
        eventPosted: new Date().toISOString().split('T')[0],
        currentRegisteredCount: 0,
        earnPoints: 100,
        category: '',
        eventType: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTimelineChange = (index, field, value) => {
        const newTimelines = [...formData.eventTimeline];
        newTimelines[index][field] = value;
        setFormData({
            ...formData,
            eventTimeline: newTimelines,
        });
    };

    const addTimelineField = () => {
        setFormData({
            ...formData,
            eventTimeline: [
                ...formData.eventTimeline,
                { day: '', time: '', activity: '' },
            ]
        });
    };

    const removeTimelineField = (index) => {
        const newTimelines = [...formData.eventTimeline];
        newTimelines.splice(index, 1);
        setFormData({
            ...formData,
            eventTimeline: newTimelines,
        });
    };

    const handleSelectChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/events', formData);
            Swal.fire({
                title: 'Success!',
                text: 'Event added successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Reset the form after success
            setFormData({
                eventTitle: '',
                eventImageUrl: '',
                eventDetails: '',
                registrationDeadline: '',
                registrationFee: '',
                eventTimeline: [
                    { day: '', time: '', activity: '' }
                ],
                eventPosted: new Date().toISOString().split('T')[0],
                currentRegisteredCount: 0,
                earnPoints: 100,
                category: '',
                eventType: '',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add event.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <Card className="p-6  max-w-4xl mx-auto my-20">
            <Typography variant="h4" color="blue-gray">
                Add New Event
            </Typography>
            <form onSubmit={handleFormSubmit} className="mt-4">
               <div className='mb-3'>
               <Input
                    label="Event Title"
                    name="eventTitle"
                    value={formData.eventTitle}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                />
               </div>
               <div className='mb-3'></div>
                <Input
                    label="Event Image URL"
                    name="eventImageUrl"
                    value={formData.eventImageUrl}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                />
                <div className='mb-3'></div>
                <Textarea
                    label="Event Details"
                    name="eventDetails"
                    value={formData.eventDetails}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                />
                <div className='mb-3'></div>
                <Input
                    label="Registration Deadline"
                    name="registrationDeadline"
                    type="date"
                    value={formData.registrationDeadline}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                />
                <div className='mb-3'></div>
                <Input
                    label="Registration Fee"
                    name="registrationFee"
                    type="number"
                    value={formData.registrationFee}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                />

                {/* Dynamic Event Timeline Section */}
                <div className="mt-4">
                    <Typography variant="h6" color="blue-gray">
                        Event Timeline
                    </Typography>
                    {formData.eventTimeline.map((timeline, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-4 mt-2 items-center"
                        >
                            <Input
                                label="Day"
                                value={timeline.day}
                                onChange={(e) =>
                                    handleTimelineChange(index, 'day', e.target.value)
                                }
                                className="mt-0"
                                required
                            />
                            <Input
                                label="Time"
                                value={timeline.time}
                                onChange={(e) =>
                                    handleTimelineChange(index, 'time', e.target.value)
                                }
                                className="mt-0"
                                required
                            />
                            <Textarea
                                label="Activity"
                                value={timeline.activity}
                                onChange={(e) =>
                                    handleTimelineChange(index, 'activity', e.target.value)
                                }
                                className="mt-0"
                                required
                            />
                            <Button
                                type="button"
                                onClick={() => removeTimelineField(index)}
                                color="red"
                                className="mt-0  text-red-500 font-bold drop-shadow-2xl shadow-red-600  "
                                
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
    <div className='mb-3'></div>
                    <Button
                        type="button"
                        onClick={addTimelineField}
                        className="mt-2 w-full  text-green-500 font-bold drop-shadow-2xl shadow-green-600"
                    >
                        Add More Timeline
                    </Button>
                </div>
                <div className='mb-3'></div>

                {/* Category Dropdown */}
                <Select
                    label="Category"
                    value={formData.category}
                    onChange={(value) => handleSelectChange('category', value)}
                    className="mt-2"
                >
                    <Option value="Contest">Contest</Option>
                    <Option value="Seminar">Seminar</Option>
                    <Option value="Workshop">Workshop</Option>
                    <Option value="Competition">Competition</Option>
                </Select>

                <div className='mb-3'></div>
                <Select
                    label="Event Type"
                    value={formData.eventType}
                    onChange={(value) => handleSelectChange('eventType', value)}
                    className="mt-2"
                >
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="ongoing">Ongoing</Option>
                </Select>

                <Button
                    type="submit"
                    className="mt-4 w-full btn"
                >
                    Submit Event
                </Button>
            </form>
        </Card>
    );
};

export default AddPackageForm;
