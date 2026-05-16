# Payment System Guide

## Overview
This document explains the payment system implementation in the Railway Reservation System, including both real Razorpay integration and mock services for development.

## Architecture

### 1. New Payment Flow (Direct from Booking)
```
Booking Form → Create Reservation → Calculate Amount → Payment Page with Details → Payment Processing
```

### 2. Real Payment Flow (Production)
```
Payment Page → Razorpay Checkout → Backend Verification → Payment Confirmation
```

### 3. Mock Payment Flow (Development)
```
Payment Page → Mock Service → Simulated Payment → Demo Confirmation
```

## Components

### PaymentPage (`src/features/payment/PaymentPage.jsx`)
- Displays payment details and status
- Handles both real and mock payment modes
- Provides user interface for payment methods

### RazorpayButton (`src/features/payment/RazorpayButton.jsx`)
- Integrates with Razorpay SDK
- Handles payment initiation and verification
- Fallback to mock mode when backend is unavailable

### MockPaymentService (`src/api/mockPaymentService.js`)
- Simulates payment processing
- Provides demo data for development
- Handles backend unavailability gracefully

## Configuration

### Environment Variables
Create a `.env` file with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8086
VITE_RAZORPAY_KEY=rzp_test_your_actual_key_here
VITE_ENABLE_MOCK_SERVICES=true
```

### Razorpay Setup
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your test API key from the dashboard
3. Add the key to your environment variables
4. The Razorpay script is automatically loaded from the CDN

## Backend Requirements

The frontend expects the following backend endpoints:

### Payment Service Endpoints
- `GET /payment-service/payments/status/{reservationId}` - Get payment status
- `POST /payment-service/payments/verify` - Verify Razorpay payment
- `POST /payment-service/payments/process` - Process payment (legacy)

### Required Response Formats

#### Payment Status Response
```json
{
  "id": "string",
  "amount": "number",
  "status": "PENDING|SUCCESS|FAILED",
  "reservationId": "string",
  "createdAt": "ISO date string"
}
```

#### Payment Verification Request
```json
{
  "razorpay_payment_id": "string",
  "razorpay_order_id": "string", 
  "razorpay_signature": "string",
  "reservationId": "string",
  "amount": "number"
}
```

## Development Mode

When backend services are unavailable, the system automatically switches to mock mode:

1. **Automatic Detection**: The frontend checks backend availability
2. **Mock Data**: Uses simulated payment data
3. **Demo Features**: Allows testing payment flows without real transactions
4. **Visual Indicators**: Shows warning messages in demo mode

## Testing

### Testing Real Payments
1. Set `VITE_ENABLE_MOCK_SERVICES=false` in production
2. Ensure backend services are running
3. Use Razorpay test credentials

### Testing Mock Payments
1. Backend can be offline
2. Click "Simulate Payment" buttons
3. Test all payment scenarios

## Error Handling

The system handles:
- Backend unavailability
- Network errors
- Payment failures
- Invalid responses

## Security Considerations

- Never commit real Razorpay keys to version control
- Use environment variables for sensitive data
- Validate all payment responses on the backend
- Implement proper error handling

## Troubleshooting

### Common Issues

1. **Razorpay not loading**: Check internet connection and CDN availability
2. **Payment verification fails**: Ensure backend endpoints are correct
3. **Mock mode not working**: Check `VITE_ENABLE_MOCK_SERVICES` setting

### Debug Mode
Add `console.log` statements in the payment components to debug issues.

## Future Enhancements

- Support for multiple payment providers
- Payment retry mechanisms
- Better error reporting
- Payment analytics
- Refund processing
