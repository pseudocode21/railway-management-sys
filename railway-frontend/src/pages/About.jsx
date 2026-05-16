import { FaInfoCircle } from 'react-icons/fa';

export default function About() {
  return (
    <div className="container mt-5 text-center">
      <FaInfoCircle size={48} className="mb-3 text-info" />
      <h2>About Railway Reservation System</h2>
      <p>This is a demo project for booking train tickets online.</p>
    </div>
  );
}