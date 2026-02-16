# Todo App Phase 2 - Backend

This is the backend for the Todo App Phase 2, built with FastAPI and PostgreSQL.

## Features

- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python 3.7+
- **PostgreSQL**: Robust, production-ready database with async support
- **SQLModel**: SQL databases in Python, with Python type hints
- **JWT Authentication**: Secure user authentication with JSON Web Tokens
- **Async Operations**: Fully asynchronous database operations for better performance
- **Multi-user Support**: Each user has isolated tasks that only they can access

## Prerequisites

- Python 3.8+
- PostgreSQL server running locally or remotely
- Virtual environment (recommended)

## Setup Instructions

### 1. Clone the repository and navigate to the backend directory

```bash
cd c:\Users\abRahman\Desktop\heckathon-2-q-4\backend
```

### 2. Create and activate a virtual environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Create a `.env` file in the backend directory with the following variables:

```env
DATABASE_URL=postgresql+asyncpg://username:password@localhost/todoapp
BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

### 5. Start PostgreSQL server

Make sure your PostgreSQL server is running. If using a local installation, you might need to start the service:

```bash
# On Windows (using services.msc or command line)
pg_ctl -D "C:\Program Files\PostgreSQL\[version]\data" start

# On macOS (with Homebrew)
brew services start postgresql

# On Linux (Ubuntu/Debian)
sudo systemctl start postgresql
```

### 6. Create the database

Connect to PostgreSQL and create the database:

```sql
CREATE DATABASE todoapp;
-- Optionally create a user too:
-- CREATE USER username WITH PASSWORD 'password';
-- GRANT ALL PRIVILEGES ON DATABASE todoapp TO username;
```

### 7. Test the database connection

```bash
python test_db_connection.py
```

### 8. Start the server

```bash
# Option 1: Using uvicorn directly
uvicorn main:app --reload --port 8000

# Option 2: Using the start script
python start_server.py
```

The server will be available at: http://localhost:8000

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Tasks (requires authentication)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{task_id}` - Get a specific task
- `PUT /api/tasks/{task_id}` - Update a specific task
- `DELETE /api/tasks/{task_id}` - Delete a specific task
- `PATCH /api/tasks/{task_id}/toggle` - Toggle task completion status

## Database Schema

The application uses two main tables:

### Users Table
- `id`: UUID (Primary Key)
- `email`: String (Unique, Indexed)
- `hashed_password`: String

### Tasks Table
- `id`: UUID (Primary Key)
- `title`: String
- `description`: String (Optional)
- `completed`: Boolean (Default: False)
- `user_id`: UUID (Foreign Key to Users)
- `created_at`: DateTime
- `updated_at`: DateTime

## Security Features

- JWT-based authentication for all API routes
- User isolation - users can only access their own tasks
- Passwords are hashed using bcrypt
- Input validation using Pydantic models
- SQL injection prevention through parameterized queries
- JWKS-based JWT verification - backend fetches public keys from frontend to verify tokens
- Enhanced user authorization - validates JWT claims against URL parameters

## Running in Production

For production deployment, consider:

- Using environment variables for configuration
- Setting up a reverse proxy (nginx)
- Using a process manager (pm2, supervisor)
- Setting up proper logging
- Using HTTPS
- Regular security updates

## Troubleshooting

### Common Issues:

1. **Database Connection Error**: Make sure PostgreSQL is running and credentials in `.env` are correct
2. **Port Already in Use**: Change the port in the uvicorn command
3. **Module Not Found**: Make sure you've activated the virtual environment and installed requirements

## Technologies Used

- **FastAPI**: Web framework with automatic API documentation
- **SQLModel**: Combines SQLAlchemy and Pydantic
- **asyncpg**: Fast PostgreSQL driver for Python/asyncio
- **PyJWT**: JSON Web Token implementation
- **Passlib**: Password hashing library
- **Uvicorn**: ASGI server for running FastAPI applications