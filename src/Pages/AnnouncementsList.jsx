import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRocket, FaTools, FaLightbulb } from 'react-icons/fa';

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to fetch announcements');
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className='container'>
      <h2 className='page-title'>🎉 Announcements & Events 🎉</h2>
      {announcements.length ? (
        announcements.map((announcement, index) => (
          <div
            key={index}
            className={`announcement-card ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="content">
              <div className="emoji-container">
                {index % 3 === 0 && <span>🚀</span>}
                {index % 3 === 1 && <span>💡</span>}
                {index % 3 === 2 && <span>🛠️</span>}
              </div>
              <div className="text-container">
                <h3>{announcement.title}</h3>
                <p>{announcement.description}</p>
                <small>{new Date(announcement.date).toLocaleString()}</small>
              </div>
            </div>
            <div className="image-container">
              <img src={announcement.authorImage} alt={announcement.postedBy} />
            </div>
          </div>
        ))
      ) : (
        <p>No announcements at the moment.</p>
      )}
    </div>
  );
};

export default AnnouncementsList;
