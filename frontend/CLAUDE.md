# TodoFlow Frontend

## Overview
The frontend of TodoFlow is built with Next.js 14 using the App Router pattern. It provides a modern, responsive user interface with JWT-based authentication and secure communication with the backend API.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn-inspired UI components

## Directory Structure
```
frontend/
├── app/
│   ├── layout.tsx            # Root layout with Tailwind globals
│   ├── page.tsx              # Main page with login/todo functionality
│   └── globals.css           # Tailwind CSS globals and custom styles
├── components/
│   └── ui/                   # Reusable UI components
│       ├── button.tsx        # Button component
│       ├── card.tsx          # Card component
│       ├── input.tsx         # Input component
│       ├── checkbox.tsx      # Checkbox component
│       └── badge.tsx         # Badge component
├── lib/
│   └── api.ts                # API utility functions
├── public/                   # Static assets
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Features
1. **Authentication Flow**
   - Login form with email/password
   - JWT token storage in localStorage
   - Protected task management interface
   - Logout functionality

2. **Task Management**
   - Create new tasks with title and description
   - View all user tasks in a clean list
   - Mark tasks as complete/incomplete
   - Delete tasks
   - Visual indication of task status

3. **UI Components**
   - Responsive card-based layout
   - Professional form elements
   - Status badges for task completion
   - Clean typography and spacing
   - Dark mode support

## API Integration
- All requests include Authorization header with JWT token
- Proper error handling for API responses
- Loading states during API operations
- User-specific task filtering

## Styling
- Tailwind CSS for styling
- Custom theme configuration
- Responsive design for all screen sizes
- Dark mode support with automatic switching
- Consistent color palette and typography

## Security
- JWT token stored in localStorage
- Authorization headers on all API requests
- Input validation before sending requests
- Secure communication with backend