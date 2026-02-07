@echo off
REM Quick Setup Script for Todo App Phase 2 Backend
REM Run this script from the backend directory

echo ========================================
echo TODO APP PHASE 2 - BACKEND QUICK SETUP
echo ========================================

echo 1. Activating virtual environment...
call venv\Scripts\activate.bat

if errorlevel 1 (
    echo Error: Virtual environment not found!
    echo Please create a virtual environment first:
    echo python -m venv venv
    pause
    exit /b 1
)

echo.
echo 2. Installing requirements...
pip install -r requirements.txt

echo.
echo 3. Checking for .env file...
if not exist .env (
    echo WARNING: .env file not found!
    echo Creating a template .env file...
    echo DATABASE_URL=postgresql+asyncpg://username:password@localhost/todoapp > .env
    echo BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo Created .env file with template values. Please update with your actual database credentials.
)

echo.
echo 4. Testing model definitions...
python -c "from models import User, Task; print('Models loaded successfully!'); print(f'User model: {User.__name__}'); print(f'Task model: {Task.__name__}')"

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo To start the server:
echo 1. Make sure PostgreSQL is running
echo 2. Update your .env file with correct database credentials
echo 3. Run: uvicorn main:app --reload --port 8000
echo.
echo API will be available at: http://localhost:8000
echo Documentation at: http://localhost:8000/docs
echo.
pause