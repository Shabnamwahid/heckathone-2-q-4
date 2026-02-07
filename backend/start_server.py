#!/usr/bin/env python3
"""
Start Script for Todo App Phase 2 Backend
This script starts the FastAPI server
"""

import subprocess
import sys
import os

def start_server():
    """Start the FastAPI server"""
    print("Starting Todo App Phase 2 Backend Server...")
    print("Make sure PostgreSQL is running before starting the server.")
    print("Server will be available at: http://localhost:8000")
    print("API Documentation will be available at: http://localhost:8000/docs")
    print("\nTo stop the server, press Ctrl+C")
    print("="*60)
    
    try:
        # Start the server using uvicorn
        subprocess.run([sys.executable, "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"])
    except KeyboardInterrupt:
        print("\n\nServer stopped by user.")
    except FileNotFoundError:
        print("Error: uvicorn not found. Make sure you've installed the requirements.")
        print("Run: pip install -r requirements.txt")

if __name__ == "__main__":
    start_server()