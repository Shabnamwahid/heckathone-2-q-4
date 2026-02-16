# Authentication System

This document describes the authentication system for the TodoFlow application.

## Technology Stack

- **Frontend**: Better Auth client with JWT plugin
- **Backend**: FastAPI with custom JWT verification
- **Storage**: PostgreSQL database for user accounts

## Components

### Frontend Authentication

- User registration and login via email/password
- Session management using Better Auth
- JWT token handling for API requests
- Protected routes and authentication context

### Backend Authentication

- Custom Pydantic model for login form using Annotated[str, Form(alias='grant_type')] for grant_type and similar for username, password, scope, client_id, client_secret to ensure Pydantic v2 compatibility, replacing OAuth2PasswordRequestForm
- JWT token verification middleware
- User identity validation
- Secure API access based on user sessions

## Security Measures

- Password hashing using bcrypt
- Secure JWT token generation and validation
- User isolation for data access
- HTTPS enforcement in production

## User Roles

- Registered users: Full access to their own tasks
- Unregistered users: Access limited to login/register pages

## API Integration

- All API requests include JWT tokens in Authorization header
- Token validation occurs at the API gateway level
- Automatic token refresh mechanisms

## Login Form Model

Custom Pydantic model for login form using Annotated[str, Form(alias='grant_type')] for grant_type and similar for username, password, scope, client_id, client_secret to ensure Pydantic v2 compatibility, replacing OAuth2PasswordRequestForm:

```python
from pydantic import BaseModel
from typing import Annotated
from fastapi import Form

class LoginForm(BaseModel):
    grant_type: Annotated[str, Form(alias='grant_type')] = "password"
    username: Annotated[str, Form(alias='username')]
    password: Annotated[str, Form(alias='password')]
    scope: Annotated[str, Form(alias='scope')] = ""
    client_id: Annotated[str, Form(alias='client_id')] = ""
    client_secret: Annotated[str, Form(alias='client_secret')] = ""
```

Validation ensures grant_type == 'password' for security.

Alternatively, individual form fields can be used directly in the endpoint:

```python
@router.post("/login")
async def login_user(
    username: Annotated[str, Form(alias='username')],
    password: Annotated[str, Form(alias='password')],
    grant_type: Annotated[str, Form(alias='grant_type')] = "password",
    session: AsyncSession = Depends(get_async_session)
):
    # Implementation
```