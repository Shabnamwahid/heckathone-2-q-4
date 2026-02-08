# Claude Code Instructions for Backend

## Tech Stack
- FastAPI
- Python 3.9+
- SQLModel
- PostgreSQL
- Better Auth
- Uvicorn

## Project Structure
- `routes/` - API route definitions
- `models/` - Database models
- `dependencies/` - Authentication and other dependencies
- `config/` - Configuration settings
- `db/` - Database connection and session management

## Key Components
- Database Models: SQLModel with proper relationships
- API Routes: FastAPI routers with authentication
- Dependencies: JWT token validation
- Configuration: Settings management with Pydantic

## Best Practices
- Use FastAPI's built-in validation and documentation
- Implement proper authentication for all protected endpoints
- Follow SQLModel best practices for database operations
- Use async/await for database operations
- Handle errors gracefully with proper HTTP status codes

## Common Tasks
- Adding new endpoints: Create in routes/ directory with proper authentication
- Defining models: Use SQLModel with proper relationships and constraints
- Database operations: Use async sessions with proper error handling
- Authentication: Implement JWT validation using dependencies
- Configuration: Use Pydantic settings for environment variables