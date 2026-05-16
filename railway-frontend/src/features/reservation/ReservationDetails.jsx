import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import { FaTicketAlt } from 'react-icons/fa';

export default function ReservationDetails() {
  const { resId } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    api.get(`/reservation-service/reservations/get-by-resId/${resId}`)
      .then(res => setDetails(res.data))
      .catch(() => setDetails(null));
  }, [resId]);

  if (!details) return <div className="container mt-5"><div className="alert alert-info">Loading reservation...</div></div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2><FaTicketAlt className="me-2 text-info" />Reservation Details</h2>
        <p><strong>PNR:</strong> {details.pnr}</p>
        <p><strong>Train Name:</strong> {details.trainName}</p>
        <p><strong>Source:</strong> {details.source}</p>
        <p><strong>Destination:</strong> {details.destination}</p>
        <p><strong>Status:</strong> {details.status}</p>
        <h3>Passengers</h3>
        <ul className="list-group">
          {details.passengers?.map((p, idx) => (
            <li className="list-group-item" key={idx}>
              {p.name} ({p.age}, {p.gender}) - Seat: {p.seatNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}