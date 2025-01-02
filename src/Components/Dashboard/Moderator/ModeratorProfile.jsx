import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const GuideProfile = () => {
  const { user } = useAuth();
  const [guideProfile, setGuideProfile] = useState({
    name: user.displayName,
    profileImage: user.photoURL,
    contactDetails: {
      phone: '',
      email: user.email,
    },
    education: '',
    skills: [],
    workExperience: [],
  });

  useEffect(() => {
    const fetchGuideProfile = async () => {
      try {
        const res = await axios.get(`https://tripbangla.vercel.app/tourguide/${user.email}`);
        if (res.data) {
          setGuideProfile(res.data);
        }
      } catch (error) {
        console.error('Error fetching guide profile:', error);
      }
    };

    fetchGuideProfile();
  }, [user.email]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setGuideProfile((prevProfile) => ({
  //     ...prevProfile,
  //     [name]: value,
  //   }));
  // };

  // const handleContactChange = (e) => {
  //   const { name, value } = e.target;
  //   setGuideProfile((prevProfile) => ({
  //     ...prevProfile,
  //     contactDetails: {
  //       ...prevProfile.contactDetails,
  //       [name]: value,
  //     },
  //   }));
  // };

  // const handleSkillChange = (e, index) => {
  //   const newSkills = [...guideProfile.skills];
  //   newSkills[index] = e.target.value;
  //   setGuideProfile((prevProfile) => ({
  //     ...prevProfile,
  //     skills: newSkills,
  //   }));
  // };

  // const handleAddSkill = () => {
  //   setGuideProfile((prevProfile) => ({
  //     ...prevProfile,
  //     skills: [...prevProfile.skills, ''],
  //   }));
  // };

  // const handleExperienceChange = (e, index, field) => {
  //   const newExperience = [...guideProfile.workExperience];
  //   newExperience[index][field] = e.target.value;
  //   setGuideProfile((prevProfile) => ({
  //     ...prevProfile,
  //     workExperience: newExperience,
  //   }));
  // };

  // const handleAddExperience = () => {
  //   setGuideProfile((prevProfile) => ({
  //     ...prevProfile,
  //     workExperience: [
  //       ...prevProfile.workExperience,
  //       { position: '', organization: '', duration: '' },
  //     ],
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`https://tripbangla.vercel.app/tourguides/${user.email}`, guideProfile);
  //     if (res.status === 200) {
  //       toast.success('Profile updated successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     toast.error('Failed to update profile.');
  //   }
  // };

  return   ( <div className="container mx-auto mt-6">
  <h2 className="text-2xl font-bold text-center mb-6">Moderator Profile</h2>
  <div className="text-center mb-4">
    <img src={guideProfile.profileImage} alt="User" className="rounded-full w-24 h-24 mx-auto mb-4" />
    <h3 className="text-xl">{guideProfile.name}</h3>
    <p className=''>{guideProfile.contactDetails.email}</p>
  </div>
  {/* <form onSubmit={handleSubmit} className="mt-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
      <input
        type="text"
        name="phone"
        value={guideProfile.contactDetails.phone}
        onChange={handleContactChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Phone"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Education</label>
      <input
        type="text"
        name="education"
        value={guideProfile.education}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Education"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Skills</label>
      {guideProfile.skills.map((skill, index) => (
        <input
          key={index}
          type="text"
          value={skill}
          onChange={(e) => handleSkillChange(e, index)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          placeholder={`Skill ${index + 1}`}
        />
      ))}
      <button type="button" onClick={handleAddSkill} className="btn btn-info w-full mb-4">
        Add Skill
      </button>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Work Experience</label>
      {guideProfile.workExperience.map((experience, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            value={experience.position}
            onChange={(e) => handleExperienceChange(e, index, 'position')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            placeholder="Position"
          />
          <input
            type="text"
            value={experience.organization}
            onChange={(e) => handleExperienceChange(e, index, 'organization')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
            placeholder="Organization"
          />
          <input
            type="text"
            value={experience.duration}
            onChange={(e) => handleExperienceChange(e, index, 'duration')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Duration"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddExperience} className="btn btn-info w-full mb-4">
        Add Experience
      </button>
    </div>
    <button
      type="submit"
      className="btn btn-info w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Update Profile
    </button>
  </form> */}
</div>
);
};

export default GuideProfile;

