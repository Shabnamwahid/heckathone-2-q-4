# Authentication Feature Specification

## Overview
The authentication system provides secure user registration, login, and JWT-based session management for the TodoFlow application.

## Requirements
- Secure user registration with email and password
- JWT-based authentication for API requests
- Password hashing using bcrypt
- User session management via localStorage
- Protected routes that require authentication

## User Registration
- Accept email and password
- Validate email format
- Hash password before storing
- Return JWT token upon successful registration
- Prevent duplicate email registration

## User Login
- Accept email and password
- Verify credentials against stored hash
- Return JWT token upon successful authentication
- Return appropriate error for invalid credentials

## JWT Token Management
- Token expiration: 24 hours
- Secret key stored in environment variables
- Token includes user ID and email
- Backend verifies token on protected endpoints
- Frontend stores token in localStorage

## Protected Endpoints
- All task endpoints require valid JWT token
- Return 401 Unauthorized for invalid tokens
- Verify user has permission to access resources
- Filter tasks by authenticated user's ID

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Session Management
- Store JWT token in localStorage
- Clear token on logout
- Check token validity before API calls
- Redirect to login if token is invalid/expired

## Security Measures
- Use HTTPS in production
- Implement rate limiting for login attempts
- Sanitize input data
- Prevent SQL injection
- Use parameterized queries


<!--  -->
# Feature: Authentication (Phase II)

## Architecture Rule
- Authentication is handled ONLY by frontend using Better Auth
- Backend MUST NOT implement login, register, or user creation
- Backend MUST ONLY verify JWT tokens issued by Better Auth

## Authentication Flow
1. User authenticates via frontend using Better Auth
2. Frontend receives a JWT token after successful login or registration
3. Frontend sends API requests to backend with:
   Authorization: Bearer <JWT_TOKEN>
4. Backend verifies the JWT using BETTER_AUTH_SECRET
5. Backend extracts user_id from token
6. Backend processes task CRUD only for authenticated user

## Backend Constraints
- No /auth/login endpoint
- No /auth/register endpoint
- No password handling in backend
- All /api/* routes require Authorization header

## Failure Conditions
- Missing token → 401 Unauthorized
- Invalid token → 401 Unauthorized
