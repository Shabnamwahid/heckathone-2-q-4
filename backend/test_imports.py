#!/usr/bin/env python3
"""Simple test to check if there are import errors"""

try:
    print("Testing imports...")
    
    from config import settings
    print("[OK] Config imported successfully")
    
    from db import engine, async_session_maker
    print("[OK] DB imported successfully")
    
    from models import User, Task, UserCreate, TaskCreate, TaskRead, TaskUpdate
    print("[OK] Models imported successfully")
    
    from routes.auth import router as auth_router
    print("[OK] Auth routes imported successfully")
    
    from routes.tasks import router as tasks_router
    print("[OK] Task routes imported successfully")
    
    from dependencies import get_current_user, create_access_token
    print("[OK] Dependencies imported successfully")
    
    print("\nAll imports successful!")
    
except Exception as e:
    print(f"[ERROR] Import error: {e}")
    import traceback
    traceback.print_exc()