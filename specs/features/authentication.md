# Authentication System

This document describes the authentication system for the TodoFlow application.

## Technology Stack

- **Frontend**: Better Auth client with JWT plugin
- **Backend**: Better Auth integration with JWT verification
- **Storage**: PostgreSQL database for user accounts

## Components

### Frontend Authentication

- User registration and login via email/password
- Session management using Better Auth
- JWT token handling for API requests
- Protected routes and authentication context

### Backend Authentication

- JWT token verification middleware
- User identity validation
- Secure API access based on user sessions

## Security Measures

- Password hashing using bcrypt
- Secure JWT token generation and validation
- User isolation for data access
- HTTPS enforcement in production

## User Roles

- Registered users: Full access to their own tasks
- Unregistered users: Access limited to login/register pages

## API Integration

- All API requests include JWT tokens in Authorization header
- Token validation occurs at the API gateway level
- Automatic token refresh mechanisms