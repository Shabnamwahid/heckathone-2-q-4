# UI Components

This document describes the user interface components for the TodoFlow application.

## Component Library

The application uses a combination of custom components and shadcn-inspired designs with Tailwind CSS.

## Layout Components

### Navbar
- Responsive navigation bar with mobile menu
- Theme toggle for light/dark mode
- User authentication status display
- Navigation links based on authentication state

### Layout
- Root layout with theme provider
- Responsive grid system
- Consistent spacing and typography

## Authentication Components

### Login Page
- Email and password input fields
- Form validation
- Error messaging
- Link to registration page

### Registration Page
- Full name, email, and password inputs
- Form validation
- Error messaging
- Link to login page

## Dashboard Components

### Task List
- Responsive card-based layout
- Visual indicators for task completion status
- Action buttons for task management
- Empty state handling
- Loading states

### Task Creation Form
- Title and description inputs
- Validation and error handling
- Responsive design for all screen sizes

### Task Cards
- Clean, modern design with subtle shadows
- Color-coded status indicators (green for completed, red for pending)
- Interactive elements with hover effects
- Responsive layout adjustments

## UI Patterns

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive component sizing
- Touch-friendly controls

### Dark Mode Support
- Automatic theme detection
- Manual theme toggle
- Consistent color palette across themes
- Proper contrast ratios for accessibility

### Loading States
- Skeleton screens for content loading
- Spinner animations
- Progress indicators

### Error Handling
- Inline form validation
- Toast notifications for API errors
- Clear error messaging
- Graceful degradation

## Styling Approach

- Tailwind CSS utility classes
- Custom CSS variables for theming
- Consistent spacing system
- Typography hierarchy
- Color palette defined in globals.css