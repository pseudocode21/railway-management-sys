import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { FaTicketAlt, FaTrash, FaMoneyCheckAlt } from 'react-icons/fa';

export default function BookingDetails() {
  const { resId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/reservation-service/reservations/get-by-resId/${resId}`)
      .then(res => setDetails(res.data))
      .finally(() => setLoading(false));
  }, [resId]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await api.delete(`/reservation-service/reservations/delete-by-resId/${resId}`);
      window.location.href = '/user/bookings';
    } catch {
      alert('Failed to cancel booking');
    }
  };

  if (loading) return <div className="container mt-5"><div className="skeleton" style={{ height: 100 }} /></div>;
  if (!details) return <div className="container mt-5"><div className="alert alert-danger">Booking not found.</div></div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2><FaTicketAlt className="me-2 text-info" />Booking Details</h2>
        <p><strong>PNR:</strong> {details.pnr}</p>
        <p><strong>Train Name:</strong> {details.trainName}</p>
        <p><strong>Source:</strong> {details.source}</p>
        <p><strong>Destination:</strong> {details.destination}</p>
        <p><strong>Status:</strong> 
          <span className={`badge ${details.status === 'CONFIRMED' ? 'bg-success' : details.status === 'PENDING' ? 'bg-warning' : 'bg-danger'} ms-2`}>
            {details.status}
          </span>
        </p>
        <p><strong>Total Fare:</strong> ₹{details.totalFare}</p>
        <p><strong>Coach Type:</strong> {details.coachType}</p>
        <p><strong>Booking Date:</strong> {details.bookingDateTime}</p>
        
        <h3>Passengers</h3>
        <ul className="list-group">
          {details.passengers?.map((p, idx) => (
            <li className="list-group-item" key={idx}>
              {p.name} ({p.age}, {p.gender}) - Seat: <strong>{p.seatNumber}</strong>
            </li>
          ))}
        </ul>
        
        <div className="mt-4">
          {details.status === 'PENDING' && (
            <Link 
              className="btn btn-warning me-2 animate-btn" 
              to={`/payment/${resId}`}
            >
              <FaMoneyCheckAlt className="me-2" />
              Pay Now (₹{details.totalFare})
            </Link>
          )}
          
          {details.status !== 'CANCELLED' && (
            <button className="btn btn-danger animate-btn" onClick={handleCancel}>
              <FaTrash className="me-2" /> Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
