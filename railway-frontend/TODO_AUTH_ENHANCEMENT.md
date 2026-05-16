# Railway Reservation System - Auth Enhancement Plan

## Phase 1: SCSS Updates for Auth Pages
- [ ] Create dedicated SCSS variables for auth components
- [ ] Add split-panel layout styles
- [ ] Implement form styling with icons and animations
- [ ] Create responsive breakpoints for mobile

## Phase 2: Enhanced Login Component
- [ ] Two-panel split layout with background image
- [ ] Role toggle (User/Admin) as pill buttons
- [ ] Input fields with React Icons integration
- [ ] Show/hide password functionality
- [ ] Remember me checkbox
- [ ] Forgot password link
- [ ] Social login buttons (optional)
- [ ] Guest mode button
- [ ] Framer Motion animations

## Phase 3: Enhanced Register Component  
- [ ] Two-panel split layout with background image
- [ ] Complete registration form with all required fields
- [ ] Input fields with React Icons
- [ ] Password strength indicator
- [ ] Terms & conditions checkbox
- [ ] Link to login page
- [ ] Framer Motion animations

## Phase 4: Additional Features
- [ ] Form validation with Yup
- [ ] Toast notifications for success/error
- [ ] Loading states and animations
- [ ] Mobile-responsive design

## Phase 5: Integration
- [ ] Update AppRouter to use enhanced components
- [ ] Test all animations and interactions
- [ ] Verify responsive behavior

## Design Specifications:
- Primary: #0A3D62 (Deep navy)
- Secondary: #1ABC9C (Teal)
- Accent1: #F39C12 (Gold)
- Accent2: #E74C3C (Coral red)
- Background-light: #F8F9FA
- Text-dark: #212529

## Required Icons (from react-icons/fa):
- FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash
- FaGoogle, FaFacebook (for social login)
- FaTrain (for background imagery)

## Animation Rules:
- Form slide-in from left/right
- Button hover effects (scale + shadow)
- Input focus animations
- Success/error state animations
