import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { getUserFromToken } from '../../utils/jwt';
import { FaUserShield } from 'react-icons/fa';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const admin = getUserFromToken(token);
    if (admin) {
      api.get(`/admin-service/admins/${admin.adminId || admin.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setProfile(res.data))
        .catch(() => setProfile(admin));
    }
  }, []);

  if (!profile) return <div className="container mt-5"><div className="alert alert-info">Loading...</div></div>;

  return (
    <div className="container mt-5">
      <div className="card p-4 text-center">
        <FaUserShield size={48} className="mb-3 text-primary" />
        <h2>Admin Profile</h2>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>
    </div>
  );
}