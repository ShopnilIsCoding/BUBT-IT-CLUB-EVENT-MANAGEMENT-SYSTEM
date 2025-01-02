
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';

const fetchStories = async () => {
  const res = await axios.get('http://localhost:5000/stories');
  return res.data;
};

const AllStories = () => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
  });

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">
    <Spinner className="h-16 w-16 text-gray-900/50" />
  </div>
  }

  return (
    <div className="container mx-auto my-12 ">
      <h2 className="text-2xl font-bold text-center mb-6 lg:text-5xl text-secondary">What Our Student Say's</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animated-banner p-4">
        {stories.slice(0,6).map(story => (
          <div key={story._id} className="p-4 border rounded shadow-lg">
            <img src={story.imageUrl} alt={story.title} className="mb-4 w-full h-48 object-cover" />
            <h3 className="text-xl font-semibold mb-2 text-primary">{story.title}</h3>
            <p className="text-white">{story.description}</p>
            <div className="flex items-center mb-4">
              <img src={story.userPhoto} alt={story.userName} className="w-8 h-8 rounded-full mr-2" />
              <p className="text-accent">{story.userName}</p>
            </div>
            <Link to={`/stories/${story._id}`} className="text-blue-500">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
