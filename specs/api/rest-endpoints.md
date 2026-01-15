# REST API Endpoints Specification

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. Get User Tasks
- **Method**: GET
- **Path**: `/api/tasks`
- **Description**: Retrieve all tasks for the authenticated user
- **Query Parameters**:
  - `limit` (optional): Number of tasks to return (default: 10)
  - `offset` (optional): Number of tasks to skip (for pagination)
  - `sort` (optional): Sort by field (created_at, updated_at, title)
  - `order` (optional): Sort order (asc, desc)
  - `completed` (optional): Filter by completion status (true, false)
- **Response**: Array of task objects
- **Status Codes**: 200 (success), 401 (unauthorized)

### 2. Create Task
- **Method**: POST
- **Path**: `/api/tasks`
- **Description**: Create a new task for the authenticated user
- **Request Body**:
```json
{
  "title": "Task title (required)",
  "description": "Task description (optional)",
  "completed": false
}
```
- **Response**: Created task object
- **Status Codes**: 201 (created), 400 (bad request), 401 (unauthorized)

### 3. Get Specific Task
- **Method**: GET
- **Path**: `/api/tasks/{task_id}`
- **Description**: Retrieve a specific task by ID
- **Parameters**: task_id (path parameter)
- **Response**: Single task object
- **Status Codes**: 200 (success), 401 (unauthorized), 404 (not found)

### 4. Update Task
- **Method**: PUT
- **Path**: `/api/tasks/{task_id}`
- **Description**: Update an existing task
- **Parameters**: task_id (path parameter)
- **Request Body**:
```json
{
  "title": "Updated task title (optional)",
  "description": "Updated task description (optional)",
  "completed": true
}
```
- **Response**: Updated task object
- **Status Codes**: 200 (success), 400 (bad request), 401 (unauthorized), 404 (not found)

### 5. Toggle Task Completion
- **Method**: PATCH
- **Path**: `/api/tasks/{task_id}/toggle`
- **Description**: Toggle the completion status of a task
- **Parameters**: task_id (path parameter)
- **Response**: Updated task object
- **Status Codes**: 200 (success), 401 (unauthorized), 404 (not found)

### 6. Delete Task
- **Method**: DELETE
- **Path**: `/api/tasks/{task_id}`
- **Description**: Delete a specific task
- **Parameters**: task_id (path parameter)
- **Response**: Empty body
- **Status Codes**: 204 (deleted), 401 (unauthorized), 404 (not found)