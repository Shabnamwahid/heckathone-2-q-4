# Claude Code Instructions for TodoFlow Application

## Project Overview
TodoFlow is a full-stack web application built with Next.js (frontend) and FastAPI (backend) that provides a task management solution with secure authentication.

## Architecture
- Frontend: Next.js 14 with App Router, TypeScript, Tailwind CSS
- Backend: FastAPI with SQLModel, PostgreSQL
- Authentication: Better Auth with JWT
- Database: PostgreSQL (with option to use Neon Serverless)

## Key Features
- User authentication and authorization
- Task management (CRUD operations)
- Responsive UI with dark mode support
- Secure API endpoints with user isolation

## Development Guidelines
- Follow Next.js best practices for file-based routing
- Use TypeScript consistently for type safety
- Implement proper error handling and validation
- Maintain consistent UI/UX across the application
- Follow security best practices for authentication

## Common Tasks
- Adding new API endpoints: Create in backend with proper authentication checks
- Creating new UI components: Follow existing patterns and maintain responsiveness
- Updating database models: Use SQLModel and ensure proper migrations
- Adding authentication: Use Better Auth integration