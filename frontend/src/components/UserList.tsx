import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, status, error } = useSelector((state: RootState) => state.users);

  console.log('users', users)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => navigate('/create')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create User
        </button>
      </div>
      {status === 'loading' && <p>Loading users...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">
                {user.userInfo.firstName} {user.userInfo.lastName}
              </td>
              <td className="p-2 border">{user.userContact.email}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  View
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
