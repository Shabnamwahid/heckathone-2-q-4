# TODO APP PHASE 2 - BACKEND SETUP INSTRUCTIONS

## 1. Navigate to the backend directory
cd c:\Users\abRahman\Desktop\heckathon-2-q-4\backend

## 2. Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux

## 3. Install requirements
pip install -r requirements.txt

## 4. Set up environment variables
# Make sure you have a .env file with the following variables:
# DATABASE_URL=postgresql+asyncpg://username:password@localhost/todoapp
# BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production
# FRONTEND_URL=http://localhost:3000

## 5. Test database connection
python test_db_connection.py

## 6. Run the FastAPI server
uvicorn main:app --reload --port 8000

## ALTERNATIVE: Run using the main.py script
python main.py

## 7. API will be available at: http://localhost:8000
## API Documentation will be available at: http://localhost:8000/docs

---
## Complete Command Sequence (Windows):
```cmd
cd c:\Users\abRahman\Desktop\heckathon-2-q-4\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python test_db_connection.py
uvicorn main:app --reload --port 8000
```

## Environment Variables Required:
Create a `.env` file in the backend directory with these values:
```
DATABASE_URL=postgresql+asyncpg://username:password@localhost/todoapp
BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

## API Endpoints:
- GET / - Health check
- POST /auth/register - User registration
- POST /auth/login - User login
- GET /api/tasks - Get user's tasks
- POST /api/tasks - Create a task
- GET /api/tasks/{id} - Get specific task
- PUT /api/tasks/{id} - Update task
- DELETE /api/tasks/{id} - Delete task
- PATCH /api/tasks/{id}/toggle - Toggle task completion