# REST API Endpoints

This document specifies the REST API endpoints for the TodoFlow application.

## Base URL

```
https://api.todoflow.com
```

## Authentication

All endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Tasks

#### Get all tasks for a user
```
GET /api/{user_id}/tasks
```

**Parameters:**
- `user_id` (path): The ID of the user whose tasks to retrieve

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "created_at": "datetime",
    "updated_at": "datetime",
    "user_id": "uuid"
  }
]
```

#### Create a new task
```
POST /api/{user_id}/tasks
```

**Parameters:**
- `user_id` (path): The ID of the user creating the task

**Headers:**
- `Authorization`: Bearer token

**Body:**
```json
{
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "user_id": "uuid"
}
```

#### Get a specific task
```
GET /api/{user_id}/tasks/{task_id}
```

**Parameters:**
- `user_id` (path): The ID of the user
- `task_id` (path): The ID of the task

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "user_id": "uuid"
}
```

#### Update a task
```
PUT /api/{user_id}/tasks/{task_id}
```

**Parameters:**
- `user_id` (path): The ID of the user
- `task_id` (path): The ID of the task

**Headers:**
- `Authorization`: Bearer token

**Body:**
```json
{
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "user_id": "uuid"
}
```

#### Delete a task
```
DELETE /api/{user_id}/tasks/{task_id}
```

**Parameters:**
- `user_id` (path): The ID of the user
- `task_id` (path): The ID of the task

**Headers:**
- `Authorization`: Bearer token

**Response:**
- Status: 204 No Content

#### Toggle task completion
```
PATCH /api/{user_id}/tasks/{task_id}/toggle
```

**Parameters:**
- `user_id` (path): The ID of the user
- `task_id` (path): The ID of the task

**Headers:**
- `Authorization`: Bearer token

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime",
  "user_id": "uuid"
}
```

<!--  -->
## Authentication
All endpoints require JWT authentication.

Headers:
Authorization: Bearer <JWT_TOKEN>

Backend verifies token and identifies user from JWT.
