import React, { useState, useEffect } from "react";
import api from "../api";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersData = await api.fetchAllUsers();
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      // After deleting the user, fetch the updated list of users
      const usersData = await api.fetchAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto mr-4 w-full">
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Name</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Email
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Password
            </th>
            <th className="px-4 py-2 bg-gray-200 text-gray-600 border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.password}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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

export default AllUsers;
