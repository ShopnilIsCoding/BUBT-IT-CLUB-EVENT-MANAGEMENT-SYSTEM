
import useRole from '../../../hooks/useRole';
import useAuth from '../../../hooks/useAuth';
import TouristProfile from '../Tourist/TouristProfile';
import GuideProfile from '../Guide/GuideProfile';
import AdminProfile from '../Admin/AdminProfile';

const DynamicProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  const renderProfile = () => {
    switch (role) {
      case "student":
        return <TouristProfile user={user} />;
      case "moderator":
        return <GuideProfile user={user} />;
      case "admin":
        return <AdminProfile user={user} />;
      default:
        return <p>Loading...</p>;
    }
  };

  const roleColor = () => {
    switch (role) {
      case "student":
        return "bg-green-400";
      case "moderator":
        return "bg-yellow-500";
      case "admin":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center mb-4 flex flex-col justify-center items-center bg-base-300 p-4 rounded-b-xl">
        <img className="w-40 h-40 rounded-full mx-auto" src={user?.photoURL} alt="User profile" />
        <h1 className="text-xl text-secondary mb-2">{user?.email}</h1>
        <p className={`text-xl text-black ${roleColor()} px-3 py-3 rounded-full font-bold`}>{role}</p>
      </div>
      {renderProfile()}
    </div>
  );
};

export default DynamicProfile;
