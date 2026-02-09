#!/usr/bin/env python3
"""Test dependencies module"""

try:
    print("Testing dependencies import...")
    from dependencies import get_current_user, create_access_token
    print("Dependencies imported successfully!")
    
    print("Testing create_access_token function...")
    from config import settings
    token = create_access_token(data={"sub": "test", "email": "test@example.com"})
    print(f"Token created: {token[:20]}...")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()