import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaTrain,
  FaTicketAlt,
  FaUserCog,
  FaCreditCard,
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaArrowRight,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import api from '../api/axios';
import EnhancedFooter from '../components/EnhancedFooter';
import ChatbotButton from '../components/ChatbotButton';

export default function Home() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    source: '',
    destination: '',
    date: '',
    passengers: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get('/traininfo/trains/search', {
        params: { 
          source: searchForm.source, 
          destination: searchForm.destination 
        }
      });
      navigate('/trains', { state: { trains: res.data, searchParams: searchForm } });
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const quickActions = [
    { icon: FaTrain, title: 'View Trains', link: '/trains', color: '#0A3D62' },
    { icon: FaTicketAlt, title: 'My Bookings', link: '/user/bookings', color: '#1ABC9C' },
    { icon: FaUserCog, title: 'Profile', link: '/user/profile', color: '#F39C12' },
    { icon: FaCreditCard, title: 'Payments', link: '/payment', color: '#E74C3C' }
  ];

  const offers = [
    {
      id: 1,
      title: 'Festival Special',
      description: 'Get 20% off on festival season bookings',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      title: 'Weekend Getaway',
      description: 'Special discounts on weekend travels',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      title: 'New Routes',
      description: 'Explore our newly launched routes',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const trustStats = [
    { number: '2M+', label: 'Tickets Booked' },
    { number: '98%', label: 'On-Time Support' },
    { number: '500+', label: 'Routes Covered' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const liveUpdates = [
    '🚆 Special train from Delhi to Mumbai added for festival season',
    '⚠️ Platform change for Train 12345: Now departing from Platform 3',
    '🎉 New discount: 15% off on all bookings made this week',
    '📢 Maintenance alert: Some routes may experience delays today'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Book Your Journey <br />
                <span className="text-warning">With Confidence</span>
              </h1>
              <p className="lead mb-5">
                Experience seamless train booking with our modern reservation system. 
                Fast, secure, and reliable service for all your travel needs.
              </p>
              
              {/* Search Widget */}
              <div className="search-widget">
                <h4 className="text-dark mb-4">Find Your Perfect Train</h4>
                <form onSubmit={handleSearchSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6 position-relative">
                      <FaMapMarkerAlt className="input-icon" />
                      <input
                        type="text"
                        name="source"
                        className="form-control"
                        placeholder="From Station"
                        value={searchForm.source}
                        onChange={handleSearchChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 position-relative">
                      <FaMapMarkerAlt className="input-icon" />
                      <input
                        type="text"
                        name="destination"
                        className="form-control"
                        placeholder="To Station"
                        value={searchForm.destination}
                        onChange={handleSearchChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 position-relative">
                      <FaCalendarAlt className="input-icon" />
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={searchForm.date}
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className="col-md-6 position-relative">
                      <FaUsers className="input-icon" />
                      <select
                        name="passengers"
                        className="form-control"
                        value={searchForm.passengers}
                        onChange={handleSearchChange}
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <button 
                        type="submit" 
                        className="btn btn-search w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                          <FaSearch className="me-2" />
                        )}
                        Search Trains
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="col-lg-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Modern Train" 
                className="img-fluid rounded-3 shadow"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Quick Access</h2>
          <div className="row g-4">
            {quickActions.map((action, index) => (
              <div key={index} className="col-md-3 col-6">
                <Link 
                  to={action.link} 
                  className="quick-action-card text-decoration-none"
                >
                  <action.icon className="action-icon" style={{ color: action.color }} />
                  <h5 className="mt-2">{action.title}</h5>
                  <FaArrowRight className="mt-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Special Offers</h2>
          <div className="row g-4">
            {offers.map(offer => (
              <div key={offer.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img 
                    src={offer.image} 
                    className="card-img-top" 
                    alt={offer.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{offer.title}</h5>
                    <p className="card-text">{offer.description}</p>
                    <button className="btn btn-primary">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Updates Ticker */}
      <section className="py-4 bg-warning">
        <div className="container">
          <div className="live-ticker">
            <div className="ticker-content">
              {liveUpdates.map((update, index) => (
                <span key={index} className="me-5">
                  {update} • 
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-5 trust-section">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Us?</h2>
          <div className="row text-center">
            {trustStats.map((stat, index) => (
              <div key={index} className="col-md-3 col-6 mb-4">
                <div className="trust-stat">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-5">
            <div className="col-md-4 text-center">
              <FaShieldAlt size={48} className="text-primary mb-3" />
              <h5>Secure Payments</h5>
              <p>Your transactions are protected with bank-level security</p>
            </div>
            <div className="col-md-4 text-center">
              <FaClock size={48} className="text-success mb-3" />
              <h5>24/7 Support</h5>
              <p>Round-the-clock customer service for all your needs</p>
            </div>
            <div className="col-md-4 text-center">
              <FaStar size={48} className="text-warning mb-3" />
              <h5>5-Star Service</h5>
              <p>Rated excellent by thousands of satisfied customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />

      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  );
}
