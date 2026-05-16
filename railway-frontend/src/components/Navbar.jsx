import { Link, useNavigate } from 'react-router-dom';
import { getRole } from '../utils/jwt';
import { FaTrain, FaUserCog, FaTicketAlt, FaCreditCard, FaUserCircle } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';

export default function Navbar() {
  const token = localStorage.getItem('jwt');
  const role = getRole(token);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaTrain className="me-2" /> Railway Booking
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
            {role === 'USER' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/user/dashboard"><FaTicketAlt /> Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/user/bookings"><FaCreditCard /> My Bookings</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/user/profile"><FaUserCog /> Profile</Link></li>
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <FaUserCircle className="me-2" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/user/profile">View Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/user/settings">Settings</Dropdown.Item>
                  {role === 'ADMIN' && <Dropdown.Item as={Link} to="/admin/users">Manage Users</Dropdown.Item>}
                  <Dropdown.Item as={Link} to="/chatbot">Chatbot</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
              </>
            )}
            {role === 'ADMIN' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin/dashboard"><FaUserCog /> Admin Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/trains"><FaTrain /> Manage Trains</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/bookings"><FaTicketAlt /> All Bookings</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/users"><FaUserCog /> Users</Link></li>
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}