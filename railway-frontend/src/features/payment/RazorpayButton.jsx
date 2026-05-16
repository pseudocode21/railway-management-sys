import { FaCreditCard, FaExclamationTriangle } from 'react-icons/fa';
import { mockPaymentService } from '../../api/mockPaymentService';
import api from '../../api/axios';

export default function RazorpayButton({ amount, resId, usingMock = false }) {
  const handlePayment = async () => {
    if (usingMock) {
      // Handle mock payment
      try {
        const result = await mockPaymentService.processPayment(resId, amount, 'RAZOR_PAY');
        if (result.success) {
          alert('Mock payment successful! Reservation confirmed.');
          window.location.reload();
        }
      } catch (error) {
        alert('Mock payment failed. Please try again.');
      }
      return;
    }

    // Real Razorpay integration
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_XJVNHDJXFsZZ2m',
        amount: amount * 100,
        currency: 'INR',
        name: 'Railway Reservation System',
        description: `Payment for reservation ${resId}`,
        handler: async function (response) {
          try {
            // Verify payment with backend
           await api.post('/payment-service/payments/verify', {
              resId,
              amount,
              paymentMethod: 'RAZOR_PAY'
            });
            
            alert('Payment successful! Your reservation has been confirmed.');
            window.location.reload();
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
          contact: localStorage.getItem('userPhone') || ''
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
        alert(`Payment failed: ${response.error.description}`);
      });

    } catch (error) {
      console.error('Razorpay initialization error:', error);
      alert('Payment service is currently unavailable. Please try again later.');
    }
  };

  return (
    <div className="razorpay-button-container">
      <button 
        className="btn btn-primary w-100 animate-btn" 
        onClick={handlePayment}
        disabled={!window.Razorpay && !usingMock}
      >
        <FaCreditCard className="me-2" />
        {usingMock ? 'Simulate Razorpay Payment' : 'Pay with Razorpay'}
      </button>
      
      {!window.Razorpay && !usingMock && (
        <div className="alert alert-warning mt-2 small">
          <FaExclamationTriangle className="me-1" />
          Razorpay SDK not loaded. Check your internet connection.
        </div>
      )}
      
      {usingMock && (
        <div className="alert alert-info mt-2 small">
          <FaExclamationTriangle className="me-1" />
          Demo mode: This will simulate a successful payment.
        </div>
      )}
    </div>
  );
}
