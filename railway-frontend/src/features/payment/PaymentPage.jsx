import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { mockPaymentService } from '../../api/mockPaymentService';
import { FaMoneyCheckAlt, FaExclamationTriangle, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import RazorpayButton from './RazorpayButton';

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resId: paramResId } = useParams();

  const [view, setView] = useState('make');
  const [resId, setResId] = useState(paramResId || '');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  const token = localStorage.getItem('jwt');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const checkIfAlreadyPaid = useCallback(async () => {
    setError('');
    if (!token) {
      setError('You are not authorized. Please log in again.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8086/payment-service/payments/status/${resId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'SUCCESS') {
          setResult(data);
          setPaymentDone(true);
        } else {
          setPaymentDone(false);
        }
      }
    } catch (err) {
      console.log('No existing payment found');
    }
  }, [resId, token]);

  const fetchReservationDetails = useCallback(async () => {
    if (!resId) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/reservation-service/reservations/get-by-resId/${resId}`);
      const reservation = response.data;
      setReservationDetails(reservation);
      setAmount(reservation.totalFare || '');
      
      // Check if payment is already done
      await checkIfAlreadyPaid();
    } catch (err) {
      setError('Reservation not found or you are not authorized to view it.');
      console.error('Error fetching reservation:', err);
    } finally {
      setLoading(false);
    }
  }, [resId, checkIfAlreadyPaid]);

  useEffect(() => {
    if (paramResId) {
      setResId(paramResId);
      fetchReservationDetails();
    }
  }, [paramResId, fetchReservationDetails]);

  useEffect(() => {
    if (resId && view === 'make') {
      fetchReservationDetails();
    }
  }, [resId, view, fetchReservationDetails]);

  const handleMakePayment = async () => {
    setError('');

    if (!token) {
      setError('You are not authorized. Please log in again.');
      return;
    }

    if (paymentDone) {
      setError(`✅ Payment already completed for Reservation ID: ${resId}`);
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_XJVNHDJXFsZZ2m',
      amount: parseFloat(amount) * 100,
      currency: 'INR',
      name: 'Railway Reservation System',
      description: `Payment for reservation ${resId}`,
      handler: async function (response) {
        try {
          const res = await api.post('/payment-service/payments/verify', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            reservationId: resId,
            amount: parseFloat(amount)
          });

          if (!res.ok) throw new Error('Payment verification failed');
          const data = await res.json();
          setResult(data);
          setPaymentDone(true);
          alert('Payment successful! Your reservation has been confirmed.');
        } catch (err) {
          setError(err.message || 'Payment verification failed. Please contact support.');
          console.error('Payment verification error:', err);
        }
      },
      prefill: {
        name: localStorage.getItem('userName') || 'Test User',
        email: localStorage.getItem('userEmail') || 'test@example.com',
        contact: localStorage.getItem('userPhone') || '6302063232',
      },
      notes: {
        reservation: resId
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    
    rzp.on('payment.failed', function (response) {
      console.error('Payment failed:', response.error);
      setError(`Payment failed: ${response.error.description}`);
    });
  };

  const handleCheckStatus = async () => {
    setResult(null);
    setError('');

    if (!token) {
      setError('You are not authorized. Please log in again.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8086/payment-service/payments/status/${resId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Payment not found for Reservation ID: ${resId}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to retrieve payment status.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">
              <FaMoneyCheckAlt className="me-2" />
              Payment Gateway
            </h2>
            <button 
              className="btn btn-light btn-sm" 
              onClick={() => navigate('/user/dashboard')}
            >
              <FaArrowLeft className="me-1" />
              Back to Dashboard
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {/* Navigation Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${view === 'make' ? 'active' : ''}`}
                onClick={() => setView('make')}
              >
                💳 Make Payment
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${view === 'status' ? 'active' : ''}`}
                onClick={() => setView('status')}
              >
                📄 Payment Status
              </button>
            </li>
          </ul>

          {loading && (
            <div className="text-center py-4">
              <FaSpinner className="spinner me-2" />
              Loading reservation details...
            </div>
          )}

          {view === 'make' && !loading && (
            <div className="payment-form">
              <h4 className="mb-4">Make Payment for Reservation</h4>
              
              {reservationDetails && (
                <div className="alert alert-info mb-4">
                  <h5>Reservation Details</h5>
                  <p><strong>PNR:</strong> {reservationDetails.pnr}</p>
                  <p><strong>Train:</strong> {reservationDetails.trainName}</p>
                  <p><strong>Route:</strong> {reservationDetails.source} → {reservationDetails.destination}</p>
                  <p><strong>Passengers:</strong> {reservationDetails.passengers?.length}</p>
                </div>
              )}

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Reservation ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reservation ID"
                    value={resId}
                    onChange={(e) => setResId(e.target.value)}
                    disabled={!!paramResId}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Amount (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!!reservationDetails}
                  />
                </div>
              </div>

              {paymentDone ? (
                <div className="alert alert-success">
                  <h5>✅ Payment Completed</h5>
                  <p>Payment has already been processed for this reservation.</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h5>Payment Method</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="razorpay"
                        checked
                        readOnly
                      />
                      <label className="form-check-label" htmlFor="razorpay">
                        Razorpay (Secure Online Payment)
                      </label>
                    </div>
                  </div>

                  {resId && amount && (
                    <RazorpayButton
                      amount={parseFloat(amount)}
                      resId={resId}
                      usingMock={import.meta.env.VITE_ENABLE_MOCK_SERVICES === 'true'}
                    />
                  )}
                </>
              )}
            </div>
          )}

          {view === 'status' && !loading && (
            <div className="payment-form">
              <h4 className="mb-4">Check Payment Status</h4>
              
              <div className="row mb-4">
                <div className="col-md-8">
                  <label className="form-label">Reservation ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Reservation ID"
                    value={resId}
                    onChange={(e) => setResId(e.target.value)}
                  />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleCheckStatus}
                    disabled={!resId}
                  >
                    Check Status
                  </button>
                </div>
              </div>

              {result && (
                <div className="alert alert-info">
                  <h5>Payment Status</h5>
                  <p><strong>Payment ID:</strong> {result.paymentId}</p>
                  <p><strong>Reservation ID:</strong> {result.resId}</p>
                  <p><strong>Amount:</strong> ₹{result.amount}</p>
                  <p><strong>Method:</strong> {result.paymentMethod}</p>
                  <p><strong>Status:</strong> 
                    <span className={`badge ${result.status === 'SUCCESS' ? 'bg-success' : 'bg-warning'} ms-2`}>
                      {result.status}
                    </span>
                  </p>
                  <p><strong>Time:</strong> {new Date(result.paymentTime).toLocaleString()}</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-3">
              <FaExclamationTriangle className="me-2" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
