import { useEffect, useState } from "react";
import fetchLeaderboardData from "../hooks/fetchLeaderboardData";

const itemsPerPage = 10;

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboardData().then(data => setLeaderboard(data));
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentLeaderboardItems = leaderboard.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🎮 Leaderboard</h2>
      
      {/* Leaderboard Table */}
      <div className="lassbg p-6 shadow-lg rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-lg">
              <th className="border text-error  px-4 py-2">Rank</th>
              <th className="border text-error px-4 py-2">Name</th>
              <th className="border text-error px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {currentLeaderboardItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center font-semibold">{indexOfFirstItem + index + 1}</td>
                <td className="border px-4 py-2 text-center">{item.name}</td>
                <td className="border px-4 py-2 text-center text-yellow-600 font-bold">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg transition duration-200 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-blue-400'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;