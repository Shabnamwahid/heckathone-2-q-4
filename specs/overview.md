# TodoFlow - Multi-User Todo Application

## Project Overview

TodoFlow is a modern, full-stack todo application built with Next.js 14 (App Router) for the frontend and FastAPI with SQLModel for the backend. The application features JWT-based authentication, allowing multiple users to securely manage their individual tasks.

## Purpose

This document provides an overview of the TodoFlow application, outlining its core functionality, architecture, and key features. It serves as a reference for developers working on the project and stakeholders who need to understand the system's capabilities.

## Requirements

- Support for multiple users with individual task lists
- Secure authentication and authorization mechanisms
- Full CRUD operations for tasks
- Responsive and intuitive user interface
- Modern tech stack with TypeScript and Python
- Proper error handling and validation

## Implementation Details

The application follows a clean architecture pattern with separation of concerns between frontend and backend. The frontend handles user interactions and UI presentation, while the backend manages business logic, data persistence, and security.

## Validation Criteria

- All features must be tested with unit and integration tests
- Security measures must be validated against common vulnerabilities
- Performance benchmarks must meet specified requirements
- User experience must be validated through usability testing

## Architecture

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: FastAPI with SQLModel, PostgreSQL (Neon), JWT authentication
- **Database**: PostgreSQL hosted on Neon with proper schema and relationships
- **Authentication**: JWT tokens with secure storage and verification

## Features

1. **User Authentication**
   - Secure registration and login
   - JWT token-based authentication
   - Protected routes and API endpoints

2. **Task Management**
   - Create, read, update, and delete tasks
   - Mark tasks as complete/incomplete
   - User-specific task filtering
   - Task descriptions and titles

3. **Modern UI/UX**
   - Responsive design with Tailwind CSS
   - Clean, professional interface
   - Dark mode support
   - Intuitive task management

## Tech Stack

### Frontend
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Shadcn-inspired UI components

### Backend
- FastAPI
- SQLModel (SQLAlchemy + Pydantic)
- PostgreSQL (Neon)
- JWT for authentication
- bcrypt for password hashing
- Alembic for migrations

## API Endpoints

### Authentication
- `POST /auth/login` - Authenticate user and return JWT token
- `POST /auth/register` - Register new user and return JWT token

### Tasks
- `GET /api/tasks` - Retrieve all tasks for authenticated user
- `POST /api/tasks` - Create a new task for authenticated user
- `PUT /api/tasks/{id}` - Update a specific task
- `DELETE /api/tasks/{id}` - Delete a specific task
- `PATCH /api/tasks/{id}/toggle` - Toggle completion status

## Security Features

- JWT token authentication with expiration
- Password hashing using bcrypt
- User ID filtering to prevent unauthorized access
- Input validation using Pydantic schemas
- SQL injection prevention through parameterized queries
- CORS middleware for cross-origin protection