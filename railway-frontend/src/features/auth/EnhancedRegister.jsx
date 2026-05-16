import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaTrain
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

export default function EnhancedRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await api.post('/user-service/users/register', {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Section */}
        <div className="auth-form-section">
          <div className="auth-header">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              Join us and start your journey
            </motion.p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            {/* Username Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </motion.div>

            {/* Phone Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <FaPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </motion.div>

            {/* Terms Agreement */}
            <motion.div 
              className="form-check mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <input
                type="checkbox"
                className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="agreeToTerms">
                I agree to the{' '}
                <Link to="/terms" className="text-primary">
                  Terms & Conditions
                </Link>
              </label>
              {errors.terms && (
                <div className="invalid-feedback d-block">{errors.terms}</div>
              )}
            </motion.div>

            {/* Register Button */}
            <motion.button
              type="submit"
              className="btn-auth"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span className="loading-spinner me-2">⏳</span>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>

            {errors.general && (
              <motion.div 
                className="alert alert-danger mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.general}
              </motion.div>
            )}
          </form>

          {/* Footer */}
          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in here</Link>
            </p>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="auth-image-section">
          <div className="auth-image-content">
            <FaTrain size={64} className="mb-3" />
            <h2>Join Our Community</h2>
            <p>Experience seamless train booking with us</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
