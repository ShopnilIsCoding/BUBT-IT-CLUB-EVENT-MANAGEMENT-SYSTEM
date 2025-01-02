import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
const GamificationHighlights = () => {
    const highlights = [
      { id: 1, icon: <FaTrophy className="text-yellow-500 text-4xl" />, text: 'Earn coins by attending events and volunteering' },
      { id: 2, icon: <FaMedal className="text-blue-500 text-4xl" />, text: 'Unlock badges for milestones like event participation' },
      { id: 3, icon: <FaStar className="text-red-500 text-4xl" />, text: 'Exclusive rewards for top performers' },
    ];
  
    return (
      <div className="bg-base-300 shadow-lg rounded-lg p-6 mb-8 ">
        <h2 className="text-2xl font-bold text-center mb-6">✨ Gamification Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 text-gray-700 transition transform hover:scale-105"
            >
              {item.icon}
              <span className="text-sm md:text-base">{item.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    );
  };

  export default GamificationHighlights;
