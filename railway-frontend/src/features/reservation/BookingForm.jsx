import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FaUserPlus } from 'react-icons/fa';

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const trainId = searchParams.get('trainId');
  const [train, setTrain] = useState(null);
  const [form, setForm] = useState({
    source: '',
    destination: '',
    departureDate: '',
    coachType: '',
    passengers: [{ name: '', age: '', gender: '', seatPreference: '' }],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (trainId) {
      api.get(`/traininfo/trains/get/${trainId}`)
        .then(res => {
          setTrain(res.data);
          setForm(f => ({
            ...f,
            source: res.data.source,
            destination: res.data.destination,
            departureDate: res.data.departureDate,
          }));
        });
    }
  }, [trainId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePassengerChange = (idx, field, value) => {
    const updated = [...form.passengers];
    updated[idx][field] = value;
    setForm({ ...form, passengers: updated });
  };

  const addPassenger = () => {
    setForm({ ...form, passengers: [...form.passengers, { name: '', age: '', gender: '', seatPreference: '' }] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('jwt');
      const res = await api.post('/reservation-service/reservations/create', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Calculate payment amount based on train class and number of passengers
      const selectedClass = form.coachType;
      const pricePerPassenger = train.classPrices[selectedClass] || 0;
      const totalAmount = pricePerPassenger * form.passengers.length;
      
      // Redirect to payment page with reservation id and payment details
      navigate(`/payment/${res.data.resId}`, {
        state: {
          paymentDetails: {
            amount: totalAmount,
            status: 'PENDING',
            reservationId: res.data.resId,
            trainName: train.trainName,
            passengers: form.passengers.length,
            classType: selectedClass
          }
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!train) return <div className="container mt-5"><div className="alert alert-info">Loading train info...</div></div>;

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2><FaUserPlus className="me-2 text-success" />Book Train: {train.trainName}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <select name="coachType" className="form-select" value={form.coachType} onChange={handleChange} required>
              <option value="">Select Coach Type</option>
              {Object.keys(train.classPrices).map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <h3>Passengers</h3>
          {form.passengers.map((p, idx) => (
            <div className="row mb-2" key={idx}>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Name"
                  value={p.name}
                  onChange={e => handlePassengerChange(idx, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  value={p.age}
                  onChange={e => handlePassengerChange(idx, 'age', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={p.gender}
                  onChange={e => handlePassengerChange(idx, 'gender', e.target.value)}
                  required
                >
                  <option value="">Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Seat Preference"
                  value={p.seatPreference}
                  onChange={e => handlePassengerChange(idx, 'seatPreference', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary mb-3 animate-btn" onClick={addPassenger}>Add Passenger</button>
          <button type="submit" className="btn btn-success animate-btn">Book & Pay</button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
}