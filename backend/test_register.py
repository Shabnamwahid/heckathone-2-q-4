#!/usr/bin/env python3
"""Test registration directly"""

import asyncio
from models import UserCreate
from routes.auth import register_user
from db import get_async_session
from contextlib import asynccontextmanager

async def test_registration():
    try:
        print("Testing registration function directly...")
        
        # Create a user creation object
        user_data = UserCreate(
            email="test@example.com",
            full_name="Test User",
            password="testpass123"
        )
        
        # Get a session using the generator
        session_gen = get_async_session()
        session = await session_gen.__anext__()
        
        try:
            result = await register_user(user_data, session)
            print(f"Registration successful: {result}")
        finally:
            # Close the session
            try:
                await session_gen.__anext__()
            except StopAsyncIteration:
                pass
            
    except Exception as e:
        print(f"Error in registration: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_registration())