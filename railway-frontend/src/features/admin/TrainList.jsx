import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrains = () => {
    api.get('/traininfo/trains/getall')
      .then(res => setTrains(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTrains(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this train?')) return;
    try {
      await api.delete(`/traininfo/trains/delete/${id}`);
      fetchTrains();
    } catch {
      alert('Failed to delete train');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>All Trains</h2>
        <Link className="btn btn-accent animate-btn" to="/admin/add-train"><FaPlus /> Add Train</Link>
      </div>
      {loading ? <div className="skeleton" style={{ height: 100 }} /> : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Train Number</th>
              <th>Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Seats</th>
              <th>Actions</th>
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
                  <Link className="btn btn-sm btn-warning me-2 animate-btn" to={`/admin/edit-train/${train.id}`}><FaEdit /> Edit</Link>
                  <button className="btn btn-sm btn-danger animate-btn" onClick={() => handleDelete(train.id)}><FaTrash /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}