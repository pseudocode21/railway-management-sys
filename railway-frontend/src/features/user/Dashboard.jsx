import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaTrain, FaCreditCard, FaTicketAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [search, setSearch] = useState({ trainNumber: '', source: '', destination: '' });
  const [trains, setTrains] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, cancelled: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load all trains
    api.get('/traininfo/trains/getall')
      .then(res => setTrains(res.data))
      .catch(() => setTrains([]));
    // Load bookings for KPIs and pending payments
    const token = localStorage.getItem('jwt');
    api.get('/reservation-service/reservations/all', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setStats({
          total: res.data.length,
          pending: res.data.filter(b => b.status === 'PENDING').length,
          cancelled: res.data.filter(b => b.status === 'CANCELLED').length,
        });
        setPendingPayments(res.data.filter(b => b.status === 'PENDING'));
      });
  }, []);

  const handleChange = e => setSearch({ ...search, [e.target.name]: e.target.value });

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    let params = {};
    if (search.trainNumber) params.trainNumber = search.trainNumber;
    if (search.source) params.source = search.source;
    if (search.destination) params.destination = search.destination;
    try {
      const res = await api.get('/traininfo/trains/search', { params });
      setTrains(res.data);
    } catch {
      setTrains([]);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaTicketAlt size={32} className="mb-2 text-primary" />
              <h5>Total Bookings</h5>
              <span className="fs-3 fw-bold">{stats.total}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaMoneyCheckAlt size={32} className="mb-2 text-warning" />
              <h5>Pending Payments</h5>
              <span className="fs-3 fw-bold">{stats.pending}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3">
              <FaCreditCard size={32} className="mb-2 text-success" />
              <h5>Cancelled</h5>
              <span className="fs-3 fw-bold">{stats.cancelled}</span>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="card p-4 mb-4">
          <h2><FaTrain className="me-2 text-primary" />Search Trains</h2>
          <form className="row g-3 mb-3" onSubmit={handleSearch}>
            <div className="col-md-3">
              <input name="trainNumber" className="form-control" placeholder="Train Number" value={search.trainNumber} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <input name="source" className="form-control" placeholder="Source" value={search.source} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <input name="destination" className="form-control" placeholder="Destination" value={search.destination} onChange={handleChange} />
            </div>
            <div className="col-md-3">
              <button type="submit" className="btn btn-accent w-100 animate-btn">Search</button>
            </div>
          </form>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
        <div className="card p-4 mb-4">
          <h3>Available Trains</h3>
          {loading ? <div className="skeleton" style={{ height: 100 }} /> : (
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Train Number</th>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Seats</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {trains.map(train => (
                  <tr key={train.id}>
                    <td>{train.trainNumber}</td>
                    <td>{train.trainName}</td>
                    <td>{train.source}</td>
                    <td>{train.destination}</td>
                    <td>{train.availableSeats}/{train.totalSeats}</td>
                    <td>
                      <Link className="btn btn-sm btn-info animate-btn" to={`/trains/${train.id}`}>View & Book</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
      {pendingPayments.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
          <div className="card p-4 mb-4 border-warning">
            <h4 className="text-warning"><FaMoneyCheckAlt /> Pending Payments</h4>
            <ul className="list-group">
              {pendingPayments.map(b => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={b.resId}>
                  <span>Reservation: {b.resId} | Amount: ₹{b.totalFare}</span>
                  <Link className="btn btn-accent animate-btn" to={`/payment/${b.resId}`}>Pay Now</Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}