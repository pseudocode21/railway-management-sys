# Developer Onboarding Guide for Railway Reservation System

## Welcome
Welcome to the Railway Reservation System! This guide will help you get started with the project quickly and efficiently.

## Project Overview
This is a modern React-based web application for booking train tickets. It features user authentication, train search, booking management, payment processing with Razorpay, and admin functionality for managing trains and users.

## Tech Stack
- **Frontend**: React 19.1.1 with Vite
- **UI Frameworks**: Material-UI (@mui/material), Bootstrap 5.3.7
- **Routing**: React Router DOM 7.8.2
- **HTTP Client**: Axios 1.11.0
- **Authentication**: JWT (jsonwebtoken)
- **Forms**: Formik 2.4.6 with Yup validation
- **Animations**: Framer Motion 12.23.12
- **Icons**: React Icons 5.5.0
- **Charts**: Chart.js 4.5.0 with React Chart.js 2
- **Styling**: Sass 1.90.0, Bootstrap CSS
- **Notifications**: React Toastify 11.0.5

## Folder Structure

```
railway-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── axios.js                 # Axios configuration and interceptors
│   │   └── mockPaymentService.js    # Mock payment service for testing
│   ├── components/
│   │   ├── Navbar.jsx               # Main navigation bar
│   │   ├── Footer.jsx               # Simple footer
│   │   ├── EnhancedFooter.jsx       # Detailed footer with links
│   │   ├── Loader.jsx               # Loading spinner component
│   │   └── ProfileCard.jsx          # User profile card
│   ├── features/
│   │   ├── auth/
│   │   │   ├── EnhancedLogin.jsx    # Login form with animations
│   │   │   ├── EnhancedRegister.jsx # Registration form
│   │   │   └── useAuth.js           # Authentication hook
│   │   ├── user/
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── Profile.jsx          # User profile management
│   │   │   ├── Bookings.jsx         # User bookings list
│   │   │   └── BookingDetails.jsx   # Individual booking details
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx        # Admin dashboard
│   │   │   ├── Profile.jsx          # Admin profile
│   │   │   ├── TrainList.jsx        # List all trains
│   │   │   ├── AddTrain.jsx         # Add new train form
│   │   │   ├── EditTrain.jsx        # Edit train form
│   │   │   ├── AdminBookings.jsx    # All bookings management
│   │   │   └── Users.jsx            # User management
│   │   ├── trains/
│   │   │   ├── TrainList.jsx        # Public train list
│   │   │   ├── TrainSearch.jsx      # Train search functionality
│   │   │   └── TrainDetails.jsx     # Train details view
│   │   ├── reservation/
│   │   │   ├── BookingForm.jsx      # Reservation booking form
│   │   │   └── ReservationDetails.jsx # Reservation details
│   │   └── payment/
│   │       ├── PaymentPage.jsx      # Payment processing page
│   │       └── RazorpayButton.jsx   # Razorpay integration
│   ├── hooks/
│   │   └── useFetch.js              # Custom hook for API calls
│   ├── layouts/
│   │   ├── UserLayout.jsx           # Layout for user pages
│   │   └── AdminLayout.jsx          # Layout for admin pages
│   ├── pages/
│   │   ├── Home.jsx                 # Landing page
│   │   ├── About.jsx                # About page
│   │   └── NotFound.jsx             # 404 page
│   ├── router/
│   │   ├── AppRouter.jsx            # Main router configuration
│   │   └── PrivateRoute.jsx         # Protected route component
│   ├── utils/
│   │   └── jwt.js                   # JWT utility functions
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # App-specific styles
│   ├── index.scss                   # Global SCSS styles
│   └── main.jsx                     # App entry point
├── railway_knowledge.json           # Knowledge base for chatbot
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
└── README.md                        # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd railway-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8086
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Backend Communication

### API Configuration
The frontend communicates with multiple backend services:
- **User Service**: Handles user authentication and profile management
- **Admin Service**: Manages admin authentication and administrative functions
- **Train Info Service**: Provides train search and details
- **Reservation Service**: Handles booking and reservation management
- **Payment Service**: Processes payments

### Axios Setup
Located in `src/api/axios.js`:
- Base URL configuration via environment variable
- Automatic JWT token attachment to requests
- Request/response interceptors for error handling

### Key API Endpoints
- `POST /user-service/users/login` - User login
- `POST /admin-service/admins/login` - Admin login
- `GET /traininfo/trains/search` - Search trains
- `POST /reservation-service/reservations` - Create booking
- `POST /payment-service/payments` - Process payment

## Authentication Flow

### JWT Token Management
- Tokens are stored in localStorage
- Automatic token attachment via Axios interceptors
- Token expiration checking in `src/utils/jwt.js`
- Protected routes using `PrivateRoute` component

### User Roles
- **USER**: Regular users can search trains, make bookings, view profile
- **ADMIN**: Administrators can manage trains, users, and view all bookings

## Component Architecture

### Feature-Based Organization
Components are organized by features rather than type:
- Each feature has its own folder with related components
- Shared components are in the `components` folder
- Layouts provide consistent structure for different user types

### State Management
- Uses React's built-in state management (useState, useEffect)
- No external state management library
- Local state for form data and UI state
- Props drilling for component communication

## Styling Guidelines

### CSS Frameworks
- **Bootstrap**: For responsive grid system and basic components
- **Material-UI**: For advanced UI components and theming
- **Custom SCSS**: For branding and custom styles in `index.scss`

### Component Styling
- Use Bootstrap classes for common styles
- Material-UI components for complex UI elements
- Custom CSS classes for unique styling
- Responsive design principles

## Development Workflow

### Code Style
- Follow React best practices
- Use functional components with hooks
- Consistent naming conventions (PascalCase for components, camelCase for functions)
- ESLint configuration for code quality

### Git Workflow
- Feature branches for new development
- Pull requests for code review
- Main branch for production-ready code

### Testing
- Manual testing for UI components
- API testing using browser developer tools
- Cross-browser compatibility testing

## Common Development Tasks

### Adding a New Feature
1. Create feature folder in `src/features/`
2. Add components, hooks, and utilities
3. Update routing in `AppRouter.jsx`
4. Add navigation links in `Navbar.jsx`
5. Test the feature thoroughly

### Modifying API Calls
1. Update Axios configuration if needed
2. Modify API calls in relevant components
3. Handle loading states and errors
4. Update error messages in the knowledge base

### Styling Changes
1. Use existing Bootstrap/Material-UI classes
2. Add custom styles to component files or `index.scss`
3. Ensure responsive design
4. Test on different screen sizes

## Troubleshooting

### Common Issues
- **API Connection Issues**: Check backend services are running and VITE_API_BASE_URL is correct
- **Authentication Problems**: Clear localStorage and re-login
- **Build Errors**: Run `npm install` to ensure all dependencies are installed
- **Routing Issues**: Check route paths in `AppRouter.jsx`

### Debug Tools
- Browser developer tools for network requests
- React Developer Tools for component inspection
- Console logs for debugging
- Network tab for API call monitoring

## Deployment

### Production Build
```bash
npm run build
```
This creates optimized files in the `dist` folder.

### Environment Variables
For production, set:
```env
VITE_API_BASE_URL=https://your-production-api-url
```

### Deployment Platforms
- Vercel
- Netlify
- AWS S3 + CloudFront
- Traditional web servers

## Contributing

### Code Standards
- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test changes thoroughly

### Documentation
- Update this guide for new features
- Document API changes
- Update knowledge base for new functionality

## Support
- Check the knowledge base (`railway_knowledge.json`) for common questions
- Review error help section for troubleshooting
- Contact the development team for technical issues

This guide should give you everything you need to start contributing to the Railway Reservation System. Happy coding!
