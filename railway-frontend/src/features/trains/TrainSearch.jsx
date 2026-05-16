import { useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function TrainSearch() {
  const [form, setForm] = useState({ source: '', destination: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get('/traininfo-service/trains/search', {
        params: { source: form.source, destination: form.destination }
      });
      setResults(res.data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>
        <FaSearch className="me-2 text-primary" />
        Search Trains
      </h2>
      <form onSubmit={handleSearch} className="row g-3 mb-4">
        <div className="col-md-5">
          <input name="source" className="form-control" placeholder="Source" value={form.source} onChange={handleChange} required />
        </div>
        <div className="col-md-5">
          <input name="destination" className="form-control" placeholder="Destination" value={form.destination} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100 animate-btn">
            <FaSearch /> Search
          </button>
        </div>
      </form>
      {loading ? <div className="alert alert-info">Searching...</div> : (
        <ul className="list-group">
          {results.map(train => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={train.id}>
              {train.trainNumber} - {train.trainName} ({train.source} to {train.destination})
              <Link className="btn btn-sm btn-info animate-btn" to={`/trains/${train.id}`}>Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}