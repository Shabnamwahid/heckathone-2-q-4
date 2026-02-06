# TodoFlow Backend

## Overview
The backend of TodoFlow is built with FastAPI and uses SQLModel for database operations. It provides a secure REST API with JWT-based authentication and Neon PostgreSQL database integration.

## Tech Stack
- FastAPI
- SQLModel (SQLAlchemy + Pydantic)
- PostgreSQL (Neon)
- JWT for authentication
- bcrypt for password hashing
- Alembic for database migrations

## Setup Instructions

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the backend directory with the following variables:
```env
DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
BETTER_AUTH_SECRET=your-super-secret-jwt-token-with-at-least-32-characters-long
JWT_ALGORITHM=HS256
FRONTEND_URL=http://localhost:3000
```

3. Run the application:
```bash
cd backend
uvicorn main:app --reload --port 8000
```

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

## Models
### User Model
- id: UUID (Primary Key)
- email: String (Unique, Required)
- hashed_password: String (Required)
- created_at: DateTime (Default: now)

### Task Model
- id: UUID (Primary Key)
- title: String (Required)
- description: String (Optional)
- completed: Boolean (Default: False)
- user_id: UUID (Foreign Key to User)
- created_at: DateTime (Default: now)
- updated_at: DateTime (Default: now)