import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Chatbot from '../pages/Chatbot';
import EnhancedLogin from '../features/auth/EnhancedLogin';
import EnhancedRegister from '../features/auth/EnhancedRegister';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../features/user/Dashboard';
import Profile from '../features/user/Profile';
import Bookings from '../features/user/Bookings';
import BookingDetails from '../features/user/BookingDetails';
import AdminDashboard from '../features/admin/Dashboard';
import AdminProfile from '../features/admin/Profile';
import TrainList from '../features/admin/TrainList';
import AddTrain from '../features/admin/AddTrain';
import EditTrain from '../features/admin/EditTrain';
import AdminBookings from '../features/admin/AdminBookings';
import Users from '../features/admin/Users';
import TrainListUser from '../features/trains/TrainList';
import TrainSearch from '../features/trains/TrainSearch';
import TrainDetails from '../features/trains/TrainDetails';
import BookingForm from '../features/reservation/BookingForm';
import ReservationDetails from '../features/reservation/ReservationDetails';
import PaymentPage from '../features/payment/PaymentPage';
import PrivateRoute from './PrivateRoute';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<EnhancedLogin />} />
        <Route path="/register" element={<EnhancedRegister />} />

        {/* User routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<UserLayout />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/bookings" element={<Bookings />} />
            <Route path="/user/bookings/:resId" element={<BookingDetails />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/trains" element={<TrainList />} />
            <Route path="/admin/add-train" element={<AddTrain />} />
            <Route path="/admin/edit-train/:id" element={<EditTrain />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Route>

        {/* Train routes */}
        <Route path="/trains" element={<TrainListUser />} />
        <Route path="/trains/search" element={<TrainSearch />} />
        <Route path="/trains/:id" element={<TrainDetails />} />

        {/* Reservation routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/reservation/book" element={<BookingForm />} />
          <Route path="/reservation/:resId" element={<ReservationDetails />} />
        </Route>

        {/* Payment routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/payment/:resId" element={<PaymentPage />} />
          <Route path="/payments" element={<PaymentPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
