import axios from "axios";

const fetchLeaderboardData = async () => {
  try {
    // Fetch the user data from the server
    const response = await axios.get("http://localhost:5000/users");

    // Extract the user data from the response
    const users = response.data;

    // Filter only valid students with points and sort by points in descending order
    const sortedUsers = users
      .filter(user => user.role === "student" && user.status === "Verified") // Only select valid students
      .sort((a, b) => b.point - a.point); // Sort by descending points

    // Map sorted data into the leaderboard structure
    const leaderboardData = sortedUsers.map((user, index) => ({
      name: user.name,
      rank: index + 1,
      score: user.point,
    }));

    return leaderboardData; // Return the formatted leaderboard data
  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    return [];
  }
};

export default fetchLeaderboardData;
