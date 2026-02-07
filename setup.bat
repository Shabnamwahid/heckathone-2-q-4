@echo off
REM TodoFlow Phase 2 - Quick Setup Script
REM This script sets up both frontend and backend for development

echo ========================================
echo TODOFLOW PHASE 2 - QUICK SETUP
echo ========================================
echo.

echo Starting TodoFlow Phase 2 setup...
echo.

echo 1. Setting up Backend...
echo ------------------------
cd /d c:\Users\abRahman\Desktop\heckathon-2-q-4\backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing backend dependencies...
pip install -r requirements.txt

if not exist .env (
    echo Creating .env file with default values...
    echo DATABASE_URL=postgresql+asyncpg://username:password@localhost/todoapp > .env
    echo BETTER_AUTH_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
    echo FRONTEND_URL=http://localhost:3000 >> .env
    echo.
    echo NOTE: Please update the .env file with your actual database credentials
)

echo Backend setup complete!
echo.

echo 2. Setting up Frontend...
echo -------------------------
cd /d c:\Users\abRahman\Desktop\heckathon-2-q-4\frontend

echo Installing frontend dependencies...
npm install

if not exist .env.local (
    echo Creating .env.local file...
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
)

echo Frontend setup complete!
echo.

echo ========================================
echo SETUP COMPLETED!
echo ========================================
echo.
echo TO START THE APPLICATION:
echo.
echo 1. Make sure PostgreSQL is running
echo 2. Open TWO separate terminals/command prompts
echo 3. In first terminal, navigate to backend and run:
echo    cd c:\Users\abRahman\Desktop\heckathon-2-q-4\backend
echo    venv\Scripts\activate
echo    uvicorn main:app --reload --port 8000
echo.
echo 4. In second terminal, navigate to frontend and run:
echo    cd c:\Users\abRahman\Desktop\heckathon-2-q-4\frontend
echo    npm run dev
echo.
echo 5. Access the application at: http://localhost:3000
echo.
echo Backend API will be available at: http://localhost:8000
echo API Documentation at: http://localhost:8000/docs
echo.
pause