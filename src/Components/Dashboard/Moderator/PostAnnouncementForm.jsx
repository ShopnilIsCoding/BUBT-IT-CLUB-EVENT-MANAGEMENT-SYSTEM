import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const PostAnnouncementForm = () => {
  const { user } = useAuth();
  console.log(user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    name: user?.displayName || '',
    imageURL: user?.photoURL || '',
  });

  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.title || !formData.description) {
      setErrors({
        title: !formData.title,
        description: !formData.description,
      });
      Swal.fire({
        title: 'Error!',
        text: 'All fields are required.',
        icon: 'error',
      });
      return;
    }

    // Send request to server
    axios.post('http://localhost:5000/announcements', formData)
      .then((response) => {
       
          toast.success("An announcement was successfully posted")
          setFormData({
            title: '',
            description: '',
            name: user?.displayName || '',
            imageURL: user?.photoURL || '',
          });
        
      })
    
  };

  return (
    <div className="mt-24  ">
      <h2 className="form-title text-yellow-700">📣 Post a New Announcement</h2>
      <form onSubmit={handleFormSubmit} className="announcement-form glass">
        <div className="form-group">
          <label className='text-info'>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'error' : ''}
            placeholder="Enter announcement title"
          />
          {errors.title && <small className="error-message">Title is required</small>}
        </div>
        <div className="form-group">
          <label className='text-info'>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
            placeholder="Enter announcement description"
          />
          {errors.description && <small className="error-message">Description is required</small>}
        </div>

        <button type="submit" className="btn btn-primary  " onClick={()=>toast.success("An announcement has been successfully posted")}>Submit Announcement</button>
      </form>
    </div>
  );
};

export default PostAnnouncementForm;
