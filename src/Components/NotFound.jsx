
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <Typography variant="h1" className="text-6xl font-bold text-red-600">
          404
        </Typography>
        <Typography variant="h2" className="text-3xl font-bold text-gray-800 mt-4">
          Page Not Found
        </Typography>
        <Typography variant="body1" className="text-lg text-gray-600 mt-2">
          The page you are looking for does not exist.
        </Typography>
        <Link to="/">
          <Button className="btn btn-info mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
