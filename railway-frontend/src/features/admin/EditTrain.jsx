import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaTrain } from 'react-icons/fa';

export default function AddTrain() {
  const [form, setForm] = useState({
    trainNumber: '', trainName: '', source: '', destination: '',
    departureTime: '', arrivalTime: '', departureDate: '', arrivalDate: '',
    totalSeats: 0, availableSeats: 0, classPrices: {},
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleClassPriceChange = (cls, price) => setForm(prev => ({
    ...prev, classPrices: { ...prev.classPrices, [cls]: parseFloat(price) }
  }));

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
          {/* ...fields as before... */}
          <button type="submit" className="btn btn-accent animate-btn">Add Train</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}