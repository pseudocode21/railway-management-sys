import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaTrash } from 'react-icons/fa';

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.get('/user-service/users/all').then(res => setUsers(res.data));
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/user-service/users/delete/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch {
      alert('Failed to delete user');
    }
  };
  return (
    <div className="container mt-5">
      <h2>All Users</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Delete</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-sm btn-danger animate-btn" onClick={() => handleDelete(u.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}