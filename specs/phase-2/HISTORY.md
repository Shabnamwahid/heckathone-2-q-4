Phase 2 structure initialized

- Created frontend directory with placeholder
- Created backend directory with placeholder
- Created database directory with placeholder
- Created auth directory with placeholder
Backend models and database setup completed
- Created User and Todo models with proper relationships
- Set up database connection with SQLModel
- Updated Alembic env.py to import models

Backend Import Fix and JWT Implementation - Jan 28, 2026

- Fixed relative imports in specs/phase-2/backend/routes/* by converting to absolute imports
  - Changed from ..models to backend.models in routes files
  - Changed from ..db to backend.db in routes files
  - Changed from ..dependencies to backend.dependencies in routes files
  - Updated main.py to use absolute imports: from backend.db, from backend.routes, etc.
  - Updated dependencies.py to use relative imports within the same package: from .config, from .models, etc.
  - Added __init__.py to backend directory to make it a proper Python package
- Implemented JWT verification middleware in FastAPI main.py
  - Added global middleware to protect /api/ routes (except /auth/)
  - Extracts user_id from token and rejects unauthenticated requests with 401
  - Ensures all /api/tasks routes are user-isolated
- Verified that all task routes properly isolate user data
  - Each route checks that the task belongs to the authenticated user
  - Users can only access, modify, or delete their own tasks
- Tested backend functionality to ensure it runs correctly with: python -c "from backend.main import app"
  - Application can be run with: uvicorn backend.main:app --reload --port 8000 from the phase-2 directory
