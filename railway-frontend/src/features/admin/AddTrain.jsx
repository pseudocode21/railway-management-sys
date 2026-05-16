import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaTrain } from 'react-icons/fa';

export default function AddTrain() {
  const [form, setForm] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    departureDate: '',
    arrivalDate: '',
    totalSeats: 0,
    availableSeats: 0,
    classPrices: {},
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClassPriceChange = (cls, price) => {
    setForm(prev => ({
      ...prev,
      classPrices: { ...prev.classPrices, [cls]: parseFloat(price) }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/traininfo/trains/add', form);
      navigate('/admin/trains');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add train');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2><FaTrain className="me-2 text-success" />Add Train</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input name="trainNumber" className="form-control" placeholder="Train Number" value={form.trainNumber} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input name="trainName" className="form-control" placeholder="Train Name" value={form.trainName} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input name="source" className="form-control" placeholder="Source" value={form.source} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input name="destination" className="form-control" placeholder="Destination" value={form.destination} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input name="departureTime" className="form-control" placeholder="Departure Time (HH:mm)" value={form.departureTime} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input name="arrivalTime" className="form-control" placeholder="Arrival Time (HH:mm)" value={form.arrivalTime} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input name="departureDate" type="date" className="form-control" value={form.departureDate} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input name="arrivalDate" type="date" className="form-control" value={form.arrivalDate} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input name="totalSeats" type="number" className="form-control" placeholder="Total Seats" value={form.totalSeats} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <input name="availableSeats" type="number" className="form-control" placeholder="Available Seats" value={form.availableSeats} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Class Prices:</label>
            {['FIRST_AC', 'SECOND_AC', 'THIRD_AC', 'SLEEPER', 'GENERAL'].map(cls => (
              <div className="input-group mb-2" key={cls}>
                <span className="input-group-text">{cls}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-control"
                  value={form.classPrices[cls] || ''}
                  onChange={e => handleClassPriceChange(cls, e.target.value)}
                  placeholder="Price"
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-success animate-btn">Add Train</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}