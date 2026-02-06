# REST API Endpoints Specification

## Purpose
This document specifies all REST API endpoints for the TodoFlow application. It outlines the authentication requirements, request/response formats, and error handling for each endpoint.

## Requirements
- All endpoints must follow RESTful principles
- Authentication required for all protected endpoints
- Consistent request/response formats
- Proper HTTP status codes
- Comprehensive error handling

## Implementation Details
The API follows RESTful conventions with proper authentication using JWT tokens. All protected endpoints require a valid JWT token in the Authorization header. The API supports standard CRUD operations with appropriate HTTP methods and status codes.

## Validation Criteria
- All endpoints return appropriate HTTP status codes
- Authentication is enforced on protected endpoints
- Request/response formats are consistent
- Error responses follow standard format
- All validation rules are properly enforced

## Authentication Endpoints
- `POST /auth/login` - Authenticate user and return JWT token
  - Request: { email: string, password: string }
  - Response: { access_token: string, token_type: string }
  - Status: 200 OK
  - Auth: None

- `POST /auth/register` - Register new user and return JWT token
  - Request: { email: string, password: string, first_name?: string, last_name?: string }
  - Response: { access_token: string, token_type: string }
  - Status: 200 OK
  - Auth: None

- `POST /auth/logout` - Invalidate user session
  - Headers: Authorization: Bearer {token}
  - Response: { message: string }
  - Status: 200 OK
  - Auth: Required

- `GET /auth/me` - Get authenticated user information
  - Headers: Authorization: Bearer {token}
  - Response: User object without password
  - Status: 200 OK
  - Auth: Required

## Task Endpoints
- `GET /api/tasks` - Retrieve all tasks for authenticated user
  - Headers: Authorization: Bearer {token}
  - Response: Array of Task objects
  - Status: 200 OK
  - Auth: Required

- `POST /api/tasks` - Create a new task
  - Headers: Authorization: Bearer {token}
  - Body: { title: string, description?: string, completed?: boolean }
  - Response: Created Task object
  - Status: 201 Created
  - Auth: Required

- `GET /api/tasks/{id}` - Retrieve a specific task
  - Headers: Authorization: Bearer {token}
  - Response: Task object
  - Status: 200 OK
  - Auth: Required

- `PUT /api/tasks/{id}` - Update a specific task
  - Headers: Authorization: Bearer {token}
  - Body: { title?: string, description?: string, completed?: boolean }
  - Response: Updated Task object
  - Status: 200 OK
  - Auth: Required

- `DELETE /api/tasks/{id}` - Delete a specific task
  - Headers: Authorization: Bearer {token}
  - Response: Empty
  - Status: 204 No Content
  - Auth: Required

- `PATCH /api/tasks/{id}/toggle` - Toggle task completion status
  - Headers: Authorization: Bearer {token}
  - Response: Updated Task object
  - Status: 200 OK
  - Auth: Required

## Request Format
- Content-Type: application/json
- Authorization header with JWT token for protected endpoints

## Response Format
- Content-Type: application/json
- Standard response format with data and optional message
- Proper HTTP status codes

## Error Responses
- 400 Bad Request: Invalid request format
- 401 Unauthorized: Missing or invalid JWT token
- 403 Forbidden: Access to resource not permitted
- 404 Not Found: Resource doesn't exist
- 422 Unprocessable Entity: Validation errors
- 500 Internal Server Error: Unexpected server error