#!/usr/bin/env python3
"""Test argon2 password hashing"""

try:
    print("Testing argon2 import...")
    from argon2 import PasswordHasher
    
    print("Creating PasswordHasher...")
    ph = PasswordHasher()
    
    print("Hashing a password...")
    password = "testpass123"
    hashed = ph.hash(password)
    print(f"Password hashed successfully: {hashed[:20]}...")
    
    print("Verifying the password...")
    ph.verify(hashed, password)
    print("Password verification successful!")
    
    print("\nArgon2 is working correctly!")
    
except Exception as e:
    print(f"Error with argon2: {e}")
    import traceback
    traceback.print_exc()