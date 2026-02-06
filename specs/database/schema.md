# Database Schema Specification

## Purpose
This document specifies the database schema for the TodoFlow application. It outlines the structure of the database tables, relationships, indexes, and constraints required for the application.

## Requirements
- Use PostgreSQL as the database engine
- Implement proper relationships between entities
- Include appropriate indexes for performance
- Enforce data integrity through constraints
- Support user authentication and task management features

## Implementation Details
The database schema uses SQLModel with PostgreSQL as the backend database. The schema includes tables for users and tasks with proper relationships and constraints. UUIDs are used for primary keys to ensure global uniqueness.

## Validation Criteria
- All tables have appropriate primary keys
- Foreign key relationships are properly defined
- Required constraints are in place
- Indexes are created for frequently queried columns
- Data types are appropriate for each field

## Overview
The database schema defines the structure for the TodoFlow application using SQLModel with PostgreSQL as the backend database.

## Tables

### users
- id: UUID (Primary Key, Default: gen_random_uuid())
- email: VARCHAR(255) (Unique, Not Null)
- hashed_password: VARCHAR(255) (Not Null)
- first_name: VARCHAR(100) (Optional)
- last_name: VARCHAR(100) (Optional)
- is_active: BOOLEAN (Default: True)
- is_verified: BOOLEAN (Default: False)
- created_at: TIMESTAMP (Default: CURRENT_TIMESTAMP)
- updated_at: TIMESTAMP (Default: CURRENT_TIMESTAMP)

### tasks
- id: UUID (Primary Key, Default: gen_random_uuid())
- title: VARCHAR(255) (Not Null)
- description: TEXT (Optional)
- completed: BOOLEAN (Default: False)
- user_id: UUID (Foreign Key: users.id, Not Null)
- created_at: TIMESTAMP (Default: CURRENT_TIMESTAMP)
- updated_at: TIMESTAMP (Default: CURRENT_TIMESTAMP)

## Relationships
- One user can have many tasks (One-to-Many)
- Tasks are linked to users via user_id foreign key

## Indexes
- Index on users.email for faster login
- Index on tasks.user_id for efficient user-based queries
- Index on tasks.completed for filtering completed tasks

## Constraints
- Email uniqueness in users table
- Foreign key constraint between tasks.user_id and users.id
- Not null constraints on required fields
- Check constraint on email format (optional)

## Migration Strategy
- Use Alembic for database migrations
- Initial migration creates both tables
- Future migrations for schema changes