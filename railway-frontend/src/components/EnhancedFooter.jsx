import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function EnhancedFooter() {
  return (
    <footer className="enhanced-footer">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 footer-column">
            <h5>Railway Booking</h5>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
              Your trusted partner for seamless train ticket booking. Experience the convenience of modern railway reservation.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                <FaFacebook />
              </a>
              <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                <FaTwitter />
              </a>
              <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                <FaInstagram />
              </a>
              <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/trains">Search Trains</Link></li>
              <li><Link to="/user/bookings">My Bookings</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3 footer-column">
            <h5>Support</h5>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 footer-column">
            <h5>Contact Us</h5>
            <ul>
              <li className="d-flex align-items-center gap-2">
                <FaPhone size={14} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaEnvelope size={14} />
                <span>support@railwaybooking.com</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt size={14} />
                <span>123 Railway Street, City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            © {new Date().getFullYear()} Railway Reservation System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
