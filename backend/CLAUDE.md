# TodoFlow Backend

## Overview
The backend of TodoFlow is built with FastAPI and uses SQLModel for database operations. It provides a secure REST API with JWT-based authentication and PostgreSQL database integration.

## Tech Stack
- FastAPI
- SQLModel (SQLAlchemy + Pydantic)
- PostgreSQL (Neon)
- JWT for authentication
- bcrypt for password hashing
- Alembic for database migrations

## Directory Structure
```
backend/
├── main.py                   # Application entry point
├── app/
│   ├── database/
│   │   └── database.py       # Database connection and session management
│   ├── models/
│   │   ├── user.py           # User model definition
│   │   └── task.py           # Task model definition
│   ├── schemas/
│   │   ├── user.py           # User Pydantic schemas
│   │   └── task.py           # Task Pydantic schemas
│   ├── routes/
│   │   ├── auth.py           # Authentication endpoints
│   │   └── tasks.py          # Task management endpoints
│   ├── core/
│   │   ├── config.py         # Application configuration
│   │   ├── security.py       # Security utilities (JWT, hashing)
│   │   └── middleware.py     # Custom middleware
│   └── utils/
│       └── helpers.py        # Utility functions
├── requirements.txt          # Python dependencies
├── alembic.ini               # Alembic configuration
├── alembic/
│   └── versions/             # Migration files
└── .env                      # Environment variables
```

## Models
### User Model
- id: UUID (Primary Key)
- email: String (Unique, Required)
- hashed_password: String (Required)
- first_name: String (Optional)
- last_name: String (Optional)
- is_active: Boolean (Default: True)
- is_verified: Boolean (Default: False)
- created_at: DateTime (Default: now)
- updated_at: DateTime (Default: now)

### Task Model
- id: UUID (Primary Key)
- title: String (Required)
- description: String (Optional)
- completed: Boolean (Default: False)
- user_id: UUID (Foreign Key to User)
- created_at: DateTime (Default: now)
- updated_at: DateTime (Default: now)

## API Endpoints
### Authentication (/auth)
- POST /auth/login - Authenticate user and return JWT token
- POST /auth/register - Register new user and return JWT token

### Tasks (/api)
- GET /api/tasks - Retrieve all tasks for authenticated user
- POST /api/tasks - Create a new task for authenticated user
- GET /api/tasks/{id} - Retrieve a specific task
- PUT /api/tasks/{id} - Update a specific task
- DELETE /api/tasks/{id} - Delete a specific task
- PATCH /api/tasks/{id}/toggle - Toggle completion status

## Security Features
- JWT token authentication with expiration
- Password hashing using bcrypt
- User ID filtering to prevent unauthorized access
- Input validation using Pydantic schemas
- SQL injection prevention through parameterized queries
- CORS middleware for cross-origin protection

## Database
- PostgreSQL with Neon hosting
- Proper indexing for efficient queries
- Foreign key relationships between users and tasks
- UUID primary keys for security
- Connection pooling for performance

## Middleware
- JWT token verification
- Request logging
- Error handling
- Rate limiting (optional)