/* eslint-disable react/prop-types */



const AdminProfile = ({ user }) => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Profile</h2>
      <div className="text-center">
        <img src={user?.photoURL} alt="Admin" className="rounded-full w-24 h-24 mx-auto mb-4" />
        <h3 className="text-xl">{user?.displayName}</h3>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
