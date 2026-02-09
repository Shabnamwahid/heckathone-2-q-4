#!/usr/bin/env python3
"""Test database creation"""

import asyncio
from db import create_db_and_tables

async def test_db_creation():
    try:
        print("Creating database tables...")
        await create_db_and_tables()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating database tables: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_db_creation())