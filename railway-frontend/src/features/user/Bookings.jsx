import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaTrash, FaMoneyCheckAlt } from 'react-icons/fa';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState({ pnr: '', resId: '' });
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    const token = localStorage.getItem('jwt');
    api.get('/reservation-service/reservations/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setBookings(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = e => setSearch({ ...search, [e.target.name]: e.target.value });

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    let url = '';
    if (search.pnr) url = `/reservation-service/reservations/get-by-pnr/${search.pnr}`;
    else if (search.resId) url = `/reservation-service/reservations/get-by-resId/${search.resId}`;
    if (url) {
      try {
        const res = await api.get(url);
        setBookings(res.data ? [res.data] : []);
      } catch {
        setBookings([]);
      }
    } else {
      fetchBookings();
    }
    setLoading(false);
  };

  const handleCancel = async (resId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.delete(`/reservation-service/reservations/delete-by-resId/${resId}`);
      fetchBookings();
    } catch {
      alert('Failed to cancel booking');
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Bookings</h2>
      <form className="row g-3 mb-3" onSubmit={handleSearch}>
        <div className="col-md-4">
          <input name="pnr" className="form-control" placeholder="Search by PNR" value={search.pnr} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <input name="resId" className="form-control" placeholder="Search by Reservation ID" value={search.resId} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-accent w-100 animate-btn">
            <FaSearch /> Search
          </button>
        </div>
      </form>
      {loading ? <div className="skeleton" style={{ height: 100 }} /> : (
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>PNR</th>
              <th>Train Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Details</th>
              <th>Cancel</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.resId}>
                <td>{b.pnr}</td>
                <td>{b.trainName}</td>
                <td>{b.source}</td>
                <td>{b.destination}</td>
                <td>{b.status}</td>
                <td>
                  <Link className="btn btn-sm btn-info animate-btn" to={`/user/bookings/${b.resId}`}>View</Link>
                </td>
                <td>
                  {b.status !== 'CANCELLED' && (
                    <button className="btn btn-sm btn-danger animate-btn" onClick={() => handleCancel(b.resId)}>
                      <FaTrash /> Cancel
                    </button>
                  )}
                </td>
                <td>
                  {b.status === 'PENDING' && (
                    <Link className="btn btn-sm btn-warning animate-btn" to={`/payment/${b.resId}`}>
                      <FaMoneyCheckAlt /> Pay
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}