//for admins to view paginated list of users

import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/user-service';
import type { PaginatedUsers } from '../types/types';

const UsersList: React.FC = () => {
  const [usersData, setUsersData] = useState<PaginatedUsers | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(page, limit);
        setUsersData(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load users');
      }
    };
    fetchUsers();
  }, [page]);

  if (!usersData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {usersData.data.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="p-2 border">{`${user.profile.firstName} ${user.profile.lastName}`}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phoneNumber}</td>
              <td className="p-2 border">{user.metadata.accountStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {usersData.totalPages}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === usersData.totalPages}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersList;