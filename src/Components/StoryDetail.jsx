
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import  useAuth  from '../hooks/useAuth'; // assume this hook handles authentication
import { Spinner } from '@material-tailwind/react';

const fetchStory = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const res = await axios.get(`https://tripbangla.vercel.app/stories/${id}`);
  return res.data;
};

const StoryDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: story, isLoading } = useQuery({
    queryKey: ['story', id],
    queryFn: fetchStory,
  });

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">
    <Spinner className="h-16 w-16 text-gray-900/50" />
  </div>
  }

  const shareUrl = `${window.location.origin}/stories/${id}`;

  return (
    <div className="container mx-auto mt-24 p-6 glassbg rounded-3xl">
      <img src={story.imageUrl} alt={story.title} className="w-full h-64 object-cover mb-6" />
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <div className="flex items-center mb-4">
        <img src={story.userPhoto} alt={story.userName} className="w-8 h-8 rounded-full mr-2" />
        <p className="text-gray-700">{story.userName}</p>
      </div>
      <p className="text-info mb-6">{story.details}</p>
      <div className="mt-6">
        {user ? (
          <FacebookShareButton url={shareUrl} quote={story.title} hashtag="#TouristStory">
            <FacebookIcon size={32} round />
            Share on Facebook
          </FacebookShareButton>
        ) : (
          <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed">
            Log in to Share
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
