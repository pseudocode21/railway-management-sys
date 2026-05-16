# Railway Booking System - Project Structure Overview

## 📁 Project Root
- **package.json** - Project dependencies and scripts
- **vite.config.js** - Vite build configuration
- **index.html** - Main HTML entry point
- **README.md** - Project documentation
- **TODO.md** - General task tracking
- **TODO_AUTH_ENHANCEMENT.md** - Authentication enhancement tracking
- **TODO_PAYMENT_ENHANCEMENT.md** - Payment system enhancement tracking
- **PAYMENT_SYSTEM_GUIDE.md** - Payment integration guide
- **DASHBOARD_UI_ENHANCEMENT.md** - UI enhancement documentation

## 📁 src/ - Main Source Directory

### 🎯 src/api/ - API Integration
- **axios.js** - Axios HTTP client configuration with base URL and interceptors
- **mockPaymentService.js** - Mock payment service for development/testing

### 🎨 src/assets/ - Static Assets
- **react.svg** - React logo asset

### 🧩 src/components/ - Reusable Components
- **Navbar.jsx** - Main navigation bar with profile dropdown (recently enhanced)
- **ProfileCard.jsx** - Professional user profile card with avatar (newly created)
- **Footer.jsx** - Site footer component
- **EnhancedFooter.jsx** - Enhanced footer with additional features
- **Loader.jsx** - Loading spinner component

### 🚀 src/features/ - Feature Modules

#### 👥 src/features/admin/ - Admin Features
- **Dashboard.jsx** - Admin dashboard with management overview
- **Profile.jsx** - Admin profile management
- **TrainList.jsx** - List and manage trains
- **AddTrain.jsx** - Add new train form
- **EditTrain.jsx** - Edit existing train details
- **AdminBookings.jsx** - View all bookings
- **Users.jsx** - User management interface

#### 🔐 src/features/auth/ - Authentication
- **EnhancedLogin.jsx** - Improved login form with validation
- **EnhancedRegister.jsx** - Enhanced registration form
- **useAuth.js** - Authentication hook for state management

#### 💳 src/features/payment/ - Payment System
- **PaymentPage.jsx** - Main payment processing page
- **RazorpayButton.jsx** - Razorpay payment integration component

#### 🎫 src/features/reservation/ - Reservation Management
- **BookingForm.jsx** - Train booking form
- **ReservationDetails.jsx** - Reservation details view

#### 🚆 src/features/trains/ - Train Operations
- **TrainList.jsx** - Public train listing
- **TrainSearch.jsx** - Train search functionality
- **TrainDetails.jsx** - Individual train details

#### 👤 src/features/user/ - User Features
- **Dashboard.jsx** - User dashboard with profile card integration
- **Bookings.jsx** - User's booking history
- **BookingDetails.jsx** - Detailed booking information
- **Profile.jsx** - User profile page (recently enhanced with card layout)

### 🎭 src/layouts/ - Layout Components
- **UserLayout.jsx** - Layout wrapper for user pages
- **AdminLayout.jsx** - Layout wrapper for admin pages

### 📄 src/pages/ - Main Pages
- **Home.jsx** - Landing/home page
- **About.jsx** - About page
- **NotFound.jsx** - 404 error page

### 🛣️ src/router/ - Routing Configuration
- **AppRouter.jsx** - Main application router
- **PrivateRoute.jsx** - Route protection for authenticated users

### 🛠️ src/utils/ - Utility Functions
- **jwt.js** - JWT token handling utilities

## Recent Enhancements Made:

### ✅ Payment System Enhancement
- Enhanced PaymentPage with automatic reservation data loading
- Improved Razorpay integration with mock support
- Added payment status checking functionality
- Enhanced BookingDetails with "Pay Now" buttons

### ✅ Dashboard UI Enhancement  
- Created ProfileCard component with circular avatar
- Enhanced Navbar with profile dropdown menu
- Updated User Dashboard to include ProfileCard
- Converted Profile page to professional card-based layout

### ✅ Key Features of New Components:
1. **ProfileCard**: Professional user info display with avatar, role badges, and action buttons
2. **Enhanced Navbar**: Role-aware dropdown with profile management options
3. **Responsive Design**: Works on mobile, tablet, and desktop
4. **Loading States**: Skeleton UI for better user experience
5. **Error Handling**: Graceful error management

### 🚀 Ready for Testing:
- Profile page at `/user/profile` now has professional card layout
- Navbar includes profile dropdown functionality  
- Dashboard displays user profile prominently
- All components are responsive and accessible

The project is a comprehensive Railway Booking System with complete authentication, booking, payment, and admin management functionality, recently enhanced with modern UI components.
