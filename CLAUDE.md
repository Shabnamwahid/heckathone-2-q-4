# TodoFlow - Multi-User Todo Application

## Project Overview
TodoFlow is a modern, full-stack todo application built with Next.js 14 (App Router) for the frontend and FastAPI with SQLModel for the backend. The application features JWT-based authentication, allowing multiple users to securely manage their individual tasks.

## Architecture
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: FastAPI with SQLModel, PostgreSQL (Neon), JWT authentication
- **Database**: PostgreSQL hosted on Neon with proper schema and relationships
- **Authentication**: JWT tokens with secure storage and verification

## Monorepo Structure
```
todo-app/
├── frontend/                 # Next.js 14 application
│   ├── app/                  # App router pages
│   │   ├── layout.tsx        # Root layout with Tailwind globals
│   │   ├── page.tsx          # Main page with login/todo functionality
│   │   └── globals.css       # Tailwind CSS globals
│   ├── components/           # Reusable UI components
│   │   └── ui/               # Shadcn-style components
│   ├── lib/                  # Utility functions
│   │   └── api.ts            # API utility functions
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies
│   └── tsconfig.json         # TypeScript config
├── backend/                  # FastAPI backend
│   ├── main.py               # Application entry point
│   ├── app/
│   │   ├── database/         # Database connection
│   │   ├── models/           # SQLModel definitions
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── routes/           # API route definitions
│   │   └── core/             # Core application logic
│   ├── requirements.txt      # Python dependencies
│   └── alembic/              # Database migrations
├── specs/                    # Detailed specifications
│   ├── features/             # Feature specifications
│   ├── api/                  # API endpoint specifications
│   ├── database/             # Database schema specifications
│   └── authentication/       # Authentication specifications
└── README.md                 # Project documentation
```

## Features
1. **User Authentication**
   - Secure registration and login
   - JWT token-based authentication
   - Protected routes and API endpoints

2. **Task Management**
   - Create, read, update, and delete tasks
   - Mark tasks as complete/incomplete
   - User-specific task filtering
   - Task descriptions and titles

3. **Modern UI/UX**
   - Responsive design with Tailwind CSS
   - Clean, professional interface
   - Dark mode support
   - Intuitive task management

## Tech Stack
### Frontend
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Shadcn-inspired UI components
- Client-side state management

### Backend
- FastAPI
- SQLModel (SQLAlchemy + Pydantic)
- PostgreSQL (Neon)
- JWT for authentication
- bcrypt for password hashing
- Alembic for migrations

## Environment Variables
### Frontend (.env.local)
- NEXT_PUBLIC_API_URL=http://localhost:8000

### Backend (.env)
- DATABASE_URL=postgresql://user:password@localhost/dbname
- SECRET_KEY=your-secret-key
- ALGORITHM=HS256
- ACCESS_TOKEN_EXPIRE_MINUTES=30

## API Endpoints
### Authentication
- POST /auth/login
- POST /auth/register

### Tasks
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}
- PATCH /api/tasks/{id}/toggle

## Running the Application
### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Security Features
- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- User data isolation