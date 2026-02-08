# Database Schema

This document describes the database schema for the TodoFlow application.

## Database System

- **Primary Database**: PostgreSQL
- **Alternative**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (SQLAlchemy + Pydantic)

## Tables

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, NOT NULL | Unique identifier for the user |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User's email address |
| full_name | VARCHAR(255) | | User's full name |
| hashed_password | VARCHAR(255) | NOT NULL | Hashed password using bcrypt |
| created_at | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

### Tasks Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, NOT NULL | Unique identifier for the task |
| title | VARCHAR(255) | NOT NULL | Task title |
| description | TEXT | | Task description |
| completed | BOOLEAN | DEFAULT FALSE | Completion status |
| user_id | UUID | FOREIGN KEY, NOT NULL | Reference to the user who owns the task |
| created_at | TIMESTAMP | DEFAULT NOW() | Task creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

## Relationships

- **Users to Tasks**: One-to-Many (One user can have many tasks)
- **Foreign Key Constraint**: Tasks.user_id references Users.id

## Indexes

- Users table: Index on email column for efficient lookups
- Tasks table: Index on user_id column for efficient filtering by user
- Tasks table: Composite index on (user_id, completed) for efficient queries

## Security Considerations

- All data access is filtered by user_id to ensure data isolation
- No cross-user data access is permitted
- Soft deletes are not implemented; hard deletes are used for task deletion