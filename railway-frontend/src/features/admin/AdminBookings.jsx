import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaTrash, FaSearch } from 'react-icons/fa';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    api.get('/reservation-service/reservations/all')
      .then(res => setBookings(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDelete = async (resId) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await api.delete(`/reservation-service/reservations/delete-by-resId/${resId}`);
      fetchBookings();
    } catch {
      alert('Failed to delete booking');
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Bookings</h2>
      <input className="form-control mb-3" placeholder="Search by PNR or User" value={search} onChange={e => setSearch(e.target.value)} />
      {loading ? <div className="skeleton" style={{ height: 100 }} /> : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>PNR</th>
              <th>User</th>
              <th>Train</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {bookings.filter(b => b.pnr?.includes(search) || b.userId?.toString().includes(search)).map(b => (
              <tr key={b.resId}>
                <td>{b.pnr}</td>
                <td>{b.userId}</td>
                <td>{b.trainName}</td>
                <td>{b.status}</td>
                <td>
                  <button className="btn btn-sm btn-danger animate-btn" onClick={() => handleDelete(b.resId)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}