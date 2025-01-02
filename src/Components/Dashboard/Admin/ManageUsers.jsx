import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Spinner, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useState, useMemo, useCallback } from "react";
import Select from 'react-select';
import ReactPaginate from 'react-paginate';

const fetchUsers = async () => {
  const res = await axios.get(`http://localhost:5000/users`);
  return res.data;
};

const ManageUsers = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [roleRequestFilter, setRoleRequestFilter] = useState('');
  const [updatedUsers, setUpdatedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  const updateUserRole = async ({ id, role }) => {
    const res = await axios.patch(`http://localhost:5000/users/${id}/role`, { role });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success("User role updated successfully!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Failed to update user role");
    },
  });

  const roleOptions = [
    { value: '', label: 'All' },
    { value: 'student', label: 'Student' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' }
  ];

  const roleRequestOptions = [
    { value: '', label: 'All' },
    { value: 'requested', label: 'Requested' }
  ];

  const handleRoleChange = (userId, newRole, currentRole) => {
    if (currentRole === 'admin') return;
    mutation.mutate({ id: userId, role: newRole }, {
      onSuccess: () => {
        setUpdatedUsers((prev) => ({ ...prev, [userId]: true }));
      }
    });
  };

  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(user => 
      (search ? user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) : true) &&
      (roleFilter ? user.role === roleFilter : true) &&
      (roleRequestFilter ? user.roleRequest === roleRequestFilter : true)
    );
  }, [users, search, roleFilter, roleRequestFilter]);

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const currentPageData = useMemo(() => {
    const startIndex = currentPage * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Users</h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs"
          onChange={handleSearchChange}
        />
        <Select
          options={roleOptions}
          defaultValue={roleOptions[0]}
          onChange={(option) => setRoleFilter(option.value)}
          className="w-full max-w-xs"
        />
        <Select
          options={roleRequestOptions}
          defaultValue={roleRequestOptions[0]}
          onChange={(option) => setRoleRequestFilter(option.value)}
          className="w-full max-w-xs"
        />
      </div>
      <div className="overflow-scroll">
      <table className="table-auto w-full text-left  overflow-x-scroll">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Role Request</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.roleRequest || 'None'}</td>
              <td className="border px-4 py-2">
                <Button
                  size="sm"
                  className="mr-2 bg-primary"
                  onClick={() => handleRoleChange(user._id, 'admin', user.role)}
                  disabled={user.role === 'admin' || updatedUsers[user._id]}
                >
                  Make Admin
                </Button>
                <Button
                  size="sm"
                  className="btn btn-success"
                  onClick={() => handleRoleChange(user._id, 'moderator', user.role)}
                  disabled={user.role === 'moderator' || user.role === 'admin' || updatedUsers[user._id]}
                >
                  Make moderator
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
