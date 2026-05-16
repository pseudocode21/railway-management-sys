import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaTrain } from 'react-icons/fa';


export default function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/traininfo/trains/getall')
      .then(res => setTrains(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h2>
        <FaTrain className="me-2 text-primary" />
        Available Trains
      </h2>
      {loading ? <div className="alert alert-info">Loading...</div> : (
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
                  <Link className="btn btn-sm btn-info animate-btn" to={`/trains/${train.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}