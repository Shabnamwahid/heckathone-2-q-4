# Database Schema Specification - Phase II

## Overview
This document specifies the database schema for Phase II of the "Evolution of Todo" project, utilizing Neon Serverless PostgreSQL with SQLModel as the ORM. The schema supports multi-user functionality with proper data isolation.

## Database Technology
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (SQLAlchemy + Pydantic integration)
- **Connection Pooling**: Managed by Neon's connection pooling
- **Migration Tool**: Alembic for schema migrations

## Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**SQLModel Definition:**
```python
from sqlmodel import SQLModel, Field
from typing import Optional
import uuid
from datetime import datetime

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
```

### 2. Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**SQLModel Definition:**
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import uuid
from datetime import datetime

class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    user_id: uuid.UUID = Field(foreign_key="users.id")

class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user: "User" = Relationship(back_populates="tasks")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class User(UserBase, table=True):
    # ... previous fields ...
    tasks: list["Task"] = Relationship(back_populates="user")
```

## Indexes
- `idx_users_email`: Index on users.email for fast authentication lookups
- `idx_tasks_user_id`: Index on tasks.user_id for efficient user-specific queries
- `idx_tasks_completed`: Index on tasks.completed for filtering completed tasks
- `idx_tasks_created_at`: Index on tasks.created_at for chronological sorting

## Constraints
- Foreign key constraint ensures referential integrity between tasks and users
- Unique constraint on user emails prevents duplicate accounts
- Cascade delete removes user's tasks when user is deleted
- NOT NULL constraints on required fields ensure data integrity

## Neon Serverless Features
- Serverless scaling based on demand
- Branch-based development workflows
- Built-in connection pooling
- Automatic backup and point-in-time recovery
- Connection proxy for efficient connection management

## Security Considerations
- All passwords stored as hashed values (never plain text)
- Row-level security considerations for multi-tenant access
- SSL connections enforced for all database communications
- Parameterized queries to prevent SQL injection

## Migration Strategy
- Use Alembic for version-controlled schema migrations
- Zero-downtime migration approach for production deployments
- Automated testing of migration scripts before deployment
- Rollback capabilities for failed migrations

## Validation Criteria
- Schema supports multi-user isolation requirements
- Proper foreign key relationships maintain data integrity
- Indexes optimize query performance for user-specific operations
- SQLModel definitions accurately map to database tables
- Neon-specific optimizations are implemented 
