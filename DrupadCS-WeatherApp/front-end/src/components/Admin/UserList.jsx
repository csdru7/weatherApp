import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Fetch Users with Pagination
  const fetchUsers = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.get("http://localhost:8080/api/weather/user/userList", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        params: {
          page: currentPage,  // 0-based page indexing for Spring Data pagination
          size: pageSize
        }
      });

      const paginatedData = response.data;  // Handle paginated response
      setUsers(paginatedData.content);  // 'content' contains the users for the current page
      setTotalPages(paginatedData.totalPages);  // Set total number of pages for pagination
    } catch (err) {
      setError("An error occurred while fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  const handleUserDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Do you want to delete the user?")) return;

    const user = e.target.value;
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.delete(`http://localhost:8080/api/weather/user/delete/${user}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        fetchUsers();  // Refresh the user list after deletion
      }
    } catch (error) {
      setError("Failed to delete the user.");
    }
  };

  const handleUserUpdate = (user) => {
    navigate('/edit-user', { state: { user } });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Users List</h1>
        <div className="d-flex justify-content-between mb-4">
          <button
            onClick={() => navigate("/register-user")}
            className='btn btn-info mx-1 fw-bold'>
            Add User
          </button>
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
        <div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.userName || 'No Username'}</td>
                    <td>{user.email || 'No Email'}</td>
                    <td>{user.roles || 'No Role'}</td>
                    <td>
                      <button
                        onClick={() => handleUserUpdate(user)}
                        className='btn btn-info btn-sm mx-1'>
                        Edit
                      </button>
                      <button
                        value={user.userName}
                        onClick={handleUserDelete}
                        className='btn btn-danger btn-sm mx-1'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='d-flex justify-content-between'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className='btn btn-secondary'
              disabled={currentPage === 0}>
              Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className='btn btn-secondary'
              disabled={currentPage >= totalPages - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};