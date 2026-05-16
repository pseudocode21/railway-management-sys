import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="container mt-5 text-center">
      <FaExclamationTriangle size={48} className="mb-3 text-danger" />
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}