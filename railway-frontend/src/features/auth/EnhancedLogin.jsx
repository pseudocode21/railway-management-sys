import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle, 
  FaFacebook,
  FaTrain
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

export default function EnhancedLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'USER'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let endpoint = formData.role === 'ADMIN'
        ? '/admin-service/admins/login'
        : '/user-service/users/login';
      
      const res = await api.post(endpoint, {
        username: formData.username,
        password: formData.password
      });
      
      const token = res.data;
      localStorage.setItem('jwt', token);
      
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const redirectPath = payload.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard';
      
      toast.success('Login successful!');
      navigate(redirectPath);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    navigate('/trains');
    toast.info('Continuing as guest user');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRole = (role) => {
    setFormData(prev => ({ ...prev, role }));
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
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              Sign in to continue your journey
            </motion.p>
          </div>

          {/* Role Toggle */}
          <motion.div 
            className="role-toggle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              className={formData.role === 'USER' ? 'active' : ''}
              onClick={() => toggleRole('USER')}
              type="button"
            >
              User Login
            </button>
            <button
              className={formData.role === 'ADMIN' ? 'active' : ''}
              onClick={() => toggleRole('ADMIN')}
              type="button"
            >
              Admin Login
            </button>
          </motion.div>

          <form className="auth-form" onSubmit={handleLogin}>
            {/* Username Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Username or Email"
                value={formData.username}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
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

            {/* Options */}
            <motion.div 
              className="auth-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="btn-auth"
              disabled={loading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <span className="loading-spinner me-2">⏳</span>
                  Signing in...
                </>
              ) : (
                'Sign In'
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

          {/* Divider */}
          <motion.div 
            className="auth-divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span>or continue with</span>
          </motion.div>

          {/* Social Login */}
          <motion.div 
            className="social-auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <button type="button" className="btn-social google" disabled={loading}>
              <FaGoogle /> Google
            </button>
            <button type="button" className="btn-social facebook" disabled={loading}>
              <FaFacebook /> Facebook
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="auth-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p>
              Don't have an account?{' '}
              <Link to="/register">Create account</Link>
            </p>
          </motion.div>

          {/* Guest Mode */}
          <motion.div 
            className="guest-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button 
              type="button" 
              className="btn-guest"
              onClick={handleGuestMode}
              disabled={loading}
            >
              Continue as Guest
            </button>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="auth-image-section">
          <div className="auth-image-content">
            <FaTrain size={64} className="mb-3" />
            <h2>Railway Reservation</h2>
            <p>Your journey begins here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
