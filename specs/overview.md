# Project Overview

This document provides an overview of the TodoFlow application, a full-stack web application built with Next.js, FastAPI, and PostgreSQL.

## Architecture

The application follows a monorepo structure with:
- Frontend: Next.js 14 with App Router, TypeScript, Tailwind CSS
- Backend: FastAPI with SQLModel, PostgreSQL
- Authentication: Better Auth with JWT
- Database: PostgreSQL (with option to use Neon Serverless)

## Features

- User authentication and authorization
- Task management (CRUD operations)
- Responsive UI with dark mode support
- Secure API endpoints with user isolation
- Modern UI with shadcn-inspired components

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Better Auth
- Backend: Python, FastAPI, SQLModel, PostgreSQL
- Deployment: Vercel (frontend), Railway/Heroku (backend)