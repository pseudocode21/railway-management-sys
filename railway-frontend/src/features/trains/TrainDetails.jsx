import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { FaTrain } from 'react-icons/fa';

export default function TrainDetails() {
  const { id } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    api.get(`/traininfo/trains/get/${id}`)
      .then(res => setTrain(res.data))
      .catch(() => setTrain(null));
  }, [id]);

  if (!train) return <div className="container mt-5"><div className="alert alert-info">Loading...</div></div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2><FaTrain className="me-2 text-info" />{train.trainName} ({train.trainNumber})</h2>
        <p><strong>Source:</strong> {train.source}</p>
        <p><strong>Destination:</strong> {train.destination}</p>
        <p><strong>Departure:</strong> {train.departureDate} {train.departureTime}</p>
        <p><strong>Arrival:</strong> {train.arrivalDate} {train.arrivalTime}</p>
        <p><strong>Available Seats:</strong> {train.availableSeats}/{train.totalSeats}</p>
        <h3>Class Prices</h3>
        <ul className="list-group mb-3">
          {train.classPrices && Object.entries(train.classPrices).map(([cls, price]) => (
            <li className="list-group-item" key={cls}>{cls}: ₹{price}</li>
          ))}
        </ul>
        <Link className="btn btn-success animate-btn" to={`/reservation/book?trainId=${train.id}`}>Book Now</Link>
      </div>
    </div>
  );
}