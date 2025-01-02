import { FaStar } from "react-icons/fa6";
import fetchLeaderboardData from "../hooks/fetchLeaderboardData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeaderboardPreview = () => {
  const leaderboardData = [
    { name: 'Alice Johnson', rank: 1, score: 150 },
    { name: 'Bob Smith', rank: 2, score: 120 },
    { name: 'Charlie Brown', rank: 3, score: 100 },
    { name: 'David White', rank: 4, score: 90 },
    { name: 'Emily Adams', rank: 5, score: 85 },
  ];
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboardData().then(data => setLeaderboard(data));
  }, []);

  // Function to determine color for the rank
  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500'; // Gold
      case 2:
        return 'text-gray-400'; // Silver
      case 3:
        return 'text-amber-500'; // Bronze
      default:
        return 'text-base-content'; // Default text color
    }
  };

  // Function to determine emoji based on the rank
  const getRankEmoji = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏆'; // Default trophy emoji for other ranks
    }
  };

  return (
    <div className="bg-base-300 shadow-md rounded-lg p-4 mb-8 animated-banner">
      <h2 className="text-xl font-semibold mb-4 text-secondary">🏆 Top Students in Gamification</h2>
      <div className="space-y-3">
        {leaderboard.slice(0,3).map((student) => (
          <div key={student.rank} className="flex items-center justify-between border-b py-2 last:border-none">
            <div className="flex items-center">
              {/* Dynamically style the rank text and add the emoji */}
              <span className={`text-lg font-medium ${getRankColor(student.rank)}`}>
                {getRankEmoji(student.rank)} {student.rank}.
              </span>
              <span className={`ml-2 font-medium ${getRankColor(student.rank)}`}>{student.name}</span>
            </div>
            <div className="flex items-center">
              <img src={'/coin.png'} alt="Coin" className="spinning-coin w-6 h-6" />
              <span className="text-yellow-700 font-semibold ml-2">{student.score}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link to={'/leaderboard'}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
        >
          View Full Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default LeaderboardPreview;
