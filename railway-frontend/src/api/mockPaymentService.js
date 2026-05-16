// Mock payment service for development when backend is not available
export const mockPaymentService = {
  getPaymentStatus: async (resId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: resId,
      amount: 1500, 
      status: 'PENDING',
      reservationId: resId,
      createdAt: new Date().toISOString()
    };
  },

  processPayment: async (resId, amount, paymentMethod) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock success response
    return {
      success: true,
      message: 'Payment processed successfully',
      paymentId: `PAY_${Date.now()}`,
      status: 'SUCCESS'
    };5
  },

  // Mock payment methods
  getPaymentMethods: async () => {
    return [
      { id: 'razorpay', name: 'Razorpay', icon: 'FaCreditCard' },
      { id: 'paypal', name: 'PayPal', icon: 'FaPaypal' },
      { id: 'card', name: 'Credit/Debit Card', icon: 'FaCreditCard' }
    ];
  }
};

// Check if backend is available
export const isBackendAvailable = async () => {
  try {
    const response = await fetch('http://localhost:8086/health', {
      method: 'GET',
      timeout: 3000
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
