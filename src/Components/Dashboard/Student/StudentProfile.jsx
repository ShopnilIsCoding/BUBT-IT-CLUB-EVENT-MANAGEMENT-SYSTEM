/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const TouristProfile = ({ user }) => {
  const [story, setStory] = useState({
    title: '',
    description: '',
    details: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory((prevStory) => ({
      ...prevStory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storyData = {
      ...story,
      userName: user.displayName,
      userPhoto: user.photoURL,
    };

    try {
      const res = await axios.post('https://tripbangla.vercel.app/stories', storyData);
      if (res.status === 200) {
        toast.success('Story added successfully!');
        setStory({
          title: '',
          description: '',
          details: '',
          imageUrl: '',
        });
      }
    } catch (error) {
      console.error('Error adding story:', error);
      toast.error('Failed to add story.');
    }
  };

  return (
    <div className="container mx-auto mt-6 ">
      <h2 className="text-2xl font-bold text-center mb-6">Student Profile</h2>
      <div className="text-center">
        <img src={user.photoURL} alt="User" className="rounded-full w-24 h-24 mx-auto mb-4" />
        <h3 className="text-xl">{user.displayName}</h3>
        <p>{user.email}</p>
      </div>
      <h3 className="text-xl font-bold mt-6">Add a Event Story</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event Title</label>
          <input
            type="text"
            name="title"
            value={story.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Story Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={story.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Short Description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Details</label>
          <textarea
            name="details"
            value={story.details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Detailed Story"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={story.imageUrl}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Image URL"
          />
        </div>
        <button
          type="submit"
          className="btn btn-info w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Story
        </button>
      </form>
    </div>
  );
};

export default TouristProfile;
