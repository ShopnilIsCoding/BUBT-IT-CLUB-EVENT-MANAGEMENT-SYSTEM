import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const RequestToTourGuide = () => {
  const { user } = useAuth();
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${user.email}`);
        if (res.data && res.data.roleRequest === 'requested') {
          setHasRequested(true);
        }
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    };

    fetchUserStatus();
  }, [user.email]);

  const handleRequest = async () => {
    try {
      const res = await axios.put('http://localhost:5000/request-to-tourguide', { email: user.email });
      if (res.status === 200) {
        toast.success('Request to become a moderator has been sent!');
        setHasRequested(true);
      }
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error('Failed to send request.');
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Request to Become a Moderator</h2>
      {hasRequested ? (
        <p className="text-center text-green-500">You have already requested to become a Moderator.</p>
      ) : (
        <button
          onClick={handleRequest}
          className="btn btn-primary w-full"
        >
          Request to Become a Moderator
        </button>
      )}
    </div>
  );
};

export default RequestToTourGuide;
