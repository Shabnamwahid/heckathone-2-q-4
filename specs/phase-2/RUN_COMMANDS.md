# Phase-2 Run Commands

## Backend Setup and Run

1. Navigate to the backend directory:
```bash
cd specs/phase-2/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at: http://127.0.0.1:8000

## Frontend Setup and Run

1. Navigate to the frontend directory:
```bash
cd specs/phase-2/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

## Environment Variables

For the backend, create a `.env` file in the `specs/phase-2/backend` directory:
```
BETTER_AUTH_SECRET=your-better-auth-secret-key
DATABASE_URL=postgresql+asyncpg://username:password@localhost/dbname
FRONTEND_URL=http://localhost:3000
```

For the frontend, create a `.env.local` file in the `specs/phase-2/frontend` directory:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## Phase-2 Status: COMPLETE

✅ All Phase-2 requirements have been implemented and verified:

- **Backend Features:**
  - JWT authentication with proper token validation
  - User-isolated tasks (users can only access their own tasks)
  - Complete CRUD operations for tasks
  - Proper API routes with authentication middleware
  - SQLModel ORM with PostgreSQL database

- **Frontend Features:**
  - All required pages: Home (/), Login (/login), Register (/register), Tasks (/tasks)
  - Tailwind CSS for responsive, professional styling
  - Clean SaaS-style UI with improved design
  - JWT-based authentication flow
  - Task management with full CRUD functionality

- **UI/UX Improvements:**
  - Professional card-based layouts
  - Balanced spacing and typography hierarchy
  - Soft, professional color scheme
  - Reduced oversized icons for better visual balance
  - Premium SaaS-style appearance across all pages