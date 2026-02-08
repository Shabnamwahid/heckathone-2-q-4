# Claude Code Instructions for Frontend

## Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Better Auth
- React Hooks

## Project Structure
- `app/` - Next.js App Router pages
- `components/` - Reusable UI components
- `context/` - React context providers
- `lib/` - Utility functions and API clients
- `public/` - Static assets

## Key Components
- Authentication Context: Manages user session and state
- Theme Provider: Handles light/dark mode
- API Client: Axios with interceptors for authentication
- UI Components: Reusable elements with Tailwind styling

## Best Practices
- Use Next.js App Router conventions
- Implement responsive design with Tailwind
- Handle authentication state properly
- Use TypeScript for type safety
- Follow accessibility guidelines

## Common Tasks
- Adding new pages: Create in app/ directory following route conventions
- Creating components: Place in components/ directory with proper TypeScript interfaces
- Managing state: Use React Context for global state, hooks for local state
- API integration: Use the API client with proper error handling
- Theming: Use next-themes for dark mode support