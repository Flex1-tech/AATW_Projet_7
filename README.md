# UserAuth - Secure Authentication Platform

> A modern, full-stack authentication system implementing OTP-based verification with multi-channel delivery.

**Academic Project | Group 7**

---

## Overview

UserAuth is a comprehensive authentication platform that demonstrates enterprise-level security practices and modern authentication workflows. Built with Laravel and React, this project showcases secure user authentication, OTP verification, and session management.

### Key Features

- Secure email and password authentication
- One-Time Password (OTP) verification system
- Multi-channel OTP delivery (Email and WhatsApp)
- Token-based session management
- Protected routes with authorization middleware
- RESTful API architecture

---

## Project Objectives

This project was developed to demonstrate proficiency in:

- Full-stack authentication workflow implementation
- OTP-based two-factor verification systems
- Secure API design and frontend-backend integration
- Modern security practices (token management, input validation, password hashing)
- Collaborative software development workflows

---

## System Architecture

### Authentication Flow

1. **User Login**
   - User submits credentials (email and password)
   - Selects preferred OTP delivery method (Email or WhatsApp)

2. **OTP Generation**
   - Backend validates user credentials
   - Generates a time-limited 6-digit OTP
   - Dispatches OTP through selected channel

3. **OTP Verification**
   - User enters received OTP
   - Backend validates OTP authenticity and expiration
   - Issues authentication token upon successful verification

4. **Authenticated Access**
   - User gains access to protected resources
   - Token-based authorization for subsequent requests

### Project Structure

```
UserAuth/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/  # Authentication controllers
│   │   ├── Models/            # User and OTP models
│   │   └── Services/          # OTP delivery services
│   ├── database/
│   │   └── migrations/        # Database schema
│   ├── routes/
│   │   └── api.php            # API endpoints
│   └── .env.example           # Environment configuration template
│
└── frontend/                   # React + Vite
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── pages/             # Application pages
    │   ├── services/          # API integration
    │   └── routes/            # Route configuration
    └── package.json
```

---

## Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Laravel | PHP framework for API development |
| Laravel Sanctum | Token-based authentication |
| SQLite/MySQL | Database management |
| SMTP | Email delivery service |
| WhatsApp Business API | WhatsApp OTP integration |

### Frontend

| Technology | Purpose |
|------------|---------|
| React | UI library |
| Vite | Build tool and development server |
| React Router | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS | Utility-first CSS framework |

---

## Installation & Setup

### Prerequisites

Ensure the following are installed on your system:

- Node.js (v18 or higher)
- PHP (v8.1 or higher)
- Composer
- Git

### Backend Configuration

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Create environment configuration
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database and API credentials in .env
# - Database connection (SQLite or MySQL)
# - SMTP settings for email delivery
# - WhatsApp API credentials

# Run database migrations
php artisan migrate

# Start development server
php artisan serve
```

The backend API will be available at `http://127.0.0.1:8000`

### Frontend Configuration

```bash
# Navigate to frontend directory
cd frontend/userauth_frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

The frontend application will be available at `http://localhost:5173`

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | Authenticate user and request OTP |
| POST | `/api/auth/verify-otp` | Verify OTP and issue token |
| POST | `/api/auth/resend` | Resend OTP code |
| POST | `/api/auth/logout` | Invalidate authentication token |
| GET | `/api/auth/me` | Retrieve authenticated user data |

### Request/Response Examples

**Login Request**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "secure_password",
  "otp_channel": "email"
}
```

**OTP Verification Request**
```json
POST /api/auth/verify-otp
{
  "email": "user@example.com",
  "otp": "123456"
}
```

---

## Security Implementation

### Security Features

- **Password Security**: Bcrypt hashing algorithm
- **OTP Expiration**: Time-limited verification codes
- **Token Authentication**: Stateless authentication using Laravel Sanctum
- **Route Protection**: Middleware-based authorization
- **Input Validation**: Server-side validation for all user inputs
- **CSRF Protection**: Cross-Site Request Forgery prevention

### Security Considerations

This application implements industry-standard security practices suitable for educational and demonstration purposes. For production deployment, additional security measures should be considered:

- Rate limiting on authentication endpoints
- Advanced session management
- Security headers configuration
- Regular dependency updates
- Comprehensive audit logging

---

## Development Team

**Group 7** - Academic Project

This project was developed as part of a collaborative learning initiative focused on full-stack web development and security best practices.

---

## Educational Value

### Learning Outcomes

Through this project, the development team gained practical experience in:

- Designing and implementing secure authentication systems
- Understanding OAuth and token-based authentication patterns
- Building RESTful APIs with proper separation of concerns
- Integrating third-party services (email, messaging APIs)
- Managing state in modern frontend applications
- Collaborative development using version control

---

## License & Usage

This project is intended for educational and demonstration purposes. While it implements security best practices, it should undergo additional security hardening and testing before being deployed in a production environment.

---

## Future Enhancements

Potential improvements and features for future iterations:

- Social authentication integration (Google, GitHub)
- Biometric authentication support
- Advanced user session analytics
- Role-based access control (RBAC)
- Account recovery mechanisms
- Multi-language support

---

## Contact & Support

For questions or feedback regarding this project, please contact the development team through the project repository.

---

**Last Updated**: December 2025
