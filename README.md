# TodoFlow Phase 2 - Full Stack Todo Application

A complete, full-stack todo application built with Next.js (frontend) and FastAPI (backend) with PostgreSQL database.

## 🚀 Features

### Frontend (Next.js + Tailwind CSS)
- **Pages**: Home (/), Login (/login), Register (/register), Tasks (/tasks)
- **Authentication**: Secure login and registration with JWT tokens
- **Task Management**: Add, update, delete, and mark tasks as complete/pending
- **Responsive Design**: Mobile, tablet, and desktop friendly
- **Real-time Updates**: All changes reflect instantly without page reload
- **Reusable Components**: Navbar, Button, Input, Modal components
- **Professional UI**: Clean, elegant styling with Tailwind CSS

### Backend (FastAPI + PostgreSQL + SQLModel)
- **Database**: PostgreSQL with asyncpg driver for async operations
- **ORM**: SQLModel for type-safe database models
- **Authentication**: JWT-based authentication with secure token handling
- **Endpoints**: Complete CRUD operations for users and tasks
- **Validation**: Input validation and error handling
- **Security**: User isolation - each user can only access their own tasks

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLModel
- **Driver**: asyncpg (async PostgreSQL driver)
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

## 📋 Database Schema

### Users Table
- `id`: UUID (Primary Key)
- `full_name`: String
- `email`: String (Unique, Indexed)
- `hashed_password`: String
- `created_at`: DateTime

### Tasks Table
- `id`: UUID (Primary Key)
- `title`: String
- `description`: String (Optional)
- `completed`: Boolean (Default: False)
- `created_at`: DateTime
- `updated_at`: DateTime
- `user_id`: UUID (Foreign Key to Users)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL server running locally or remotely

### Backend Setup

1. **Navigate to the backend directory**:
```bash
cd c:\Users\abRahman\Desktop\heckathon-2-q-4\backend
```

2. **Create and activate virtual environment**:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**:
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql+asyncpg://username:password@localhost/todoapp
BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

5. **Start PostgreSQL server** (if using local installation):
```bash
# On Windows (using services.msc or command line)
pg_ctl -D "C:\Program Files\PostgreSQL\[version]\data" start

# On macOS (with Homebrew)
brew services start postgresql

# On Linux (Ubuntu/Debian)
sudo systemctl start postgresql
```

6. **Create the database**:
Connect to PostgreSQL and create the database:
```sql
CREATE DATABASE todoapp;
-- Optionally create a user too:
-- CREATE USER username WITH PASSWORD 'password';
-- GRANT ALL PRIVILEGES ON DATABASE todoapp TO username;
```

7. **Start the backend server**:
```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at: http://localhost:8000

### Frontend Setup

1. **Navigate to the frontend directory**:
```bash
cd c:\Users\abRahman\Desktop\heckathon-2-q-4\frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. **Start the development server**:
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Tasks (requires authentication)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{task_id}` - Update a specific task
- `DELETE /api/tasks/{task_id}` - Delete a specific task
- `PATCH /api/tasks/{task_id}/toggle` - Toggle task completion status

## 🏗️ Project Structure

```
todo-flow-phase-2/
├── backend/
│   ├── models.py          # Database models
│   ├── main.py            # FastAPI application entry point
│   ├── db.py              # Database connection setup
│   ├── config.py          # Configuration settings
│   ├── dependencies.py    # Authentication dependencies
│   ├── routes/
│   │   ├── auth.py        # Authentication routes
│   │   └── tasks.py       # Task management routes
├── frontend/
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   ├── login/page.tsx # Login page
│   │   ├── register/page.tsx # Registration page
│   │   └── tasks/page.tsx # Tasks page
│   ├── components/        # Reusable components
│   ├── context/           # React contexts
│   └── lib/               # Utility functions
```

## 🧪 Running Tests

### Backend
The backend includes comprehensive error handling and validation. You can test the API endpoints using the interactive documentation at http://localhost:8000/docs when the server is running.

### Frontend
The frontend has been built with TypeScript for type safety and includes responsive design testing across different screen sizes.

## 🚀 Production Deployment

### Backend
For production deployment, consider:
- Using environment variables for configuration
- Setting up a reverse proxy (nginx)
- Using a process manager (pm2, supervisor)
- Setting up proper logging
- Using HTTPS
- Regular security updates

### Frontend
The Next.js application can be built for production using:
```bash
npm run build
npm start
```

## 🔐 Security Features

- JWT-based authentication for all API routes
- User isolation - users can only access their own tasks
- Passwords are hashed using bcrypt
- Input validation using Pydantic models
- SQL injection prevention through parameterized queries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues, please open an issue in the repository or contact the development team.