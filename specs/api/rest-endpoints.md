# REST API Endpoints Specification - JWT-Based User Isolation

## Authentication & User Isolation
All endpoints require a valid JWT token in the Authorization header to enforce strict user isolation:
```
Authorization: Bearer <jwt_token>
```

Each JWT token contains the authenticated user's unique identifier (user_id) which is used to:
- Filter all data queries to return only records belonging to the authenticated user
- Prevent unauthorized access to other users' data
- Ensure complete data isolation between users

## JWT Token Validation
- All API requests must include a valid JWT token issued by Better Auth
- FastAPI middleware validates token authenticity and expiration
- User ID is extracted from JWT claims for data access control
- Requests with invalid or expired tokens return 401 Unauthorized

## Endpoints

### 1. Get User Tasks
- **Method**: GET
- **Path**: `/api/tasks`
- **Description**: Retrieve all tasks for the authenticated user only
- **JWT Enforcement**: Query filters tasks by user_id from JWT claims
- **Query Parameters**:
  - `limit` (optional): Number of tasks to return (default: 10)
  - `offset` (optional): Number of tasks to skip (for pagination)
  - `sort` (optional): Sort by field (created_at, updated_at, title)
  - `order` (optional): Sort order (asc, desc)
  - `completed` (optional): Filter by completion status (true, false)
- **Response**: Array of task objects belonging to authenticated user
- **Status Codes**: 200 (success), 401 (unauthorized)

### 2. Create Task
- **Method**: POST
- **Path**: `/api/tasks`
- **Description**: Create a new task assigned to the authenticated user
- **JWT Enforcement**: Task is automatically associated with user_id from JWT claims
- **Request Body**:
```json
{
  "title": "Task title (required)",
  "description": "Task description (optional)",
  "completed": false
}
```
- **Response**: Created task object with assigned user_id
- **Status Codes**: 201 (created), 400 (bad request), 401 (unauthorized)

### 3. Get Specific Task
- **Method**: GET
- **Path**: `/api/tasks/{task_id}`
- **Description**: Retrieve a specific task by ID, ensuring it belongs to the authenticated user
- **JWT Enforcement**: Validates that task.user_id matches user_id from JWT claims
- **Parameters**: task_id (path parameter)
- **Response**: Single task object if it belongs to authenticated user
- **Status Codes**: 200 (success), 401 (unauthorized), 404 (not found or not owned by user)

### 4. Update Task
- **Method**: PUT
- **Path**: `/api/tasks/{task_id}`
- **Description**: Update an existing task, validating ownership by authenticated user
- **JWT Enforcement**: Verifies task.user_id matches user_id from JWT claims before updating
- **Parameters**: task_id (path parameter)
- **Request Body**:
```json
{
  "title": "Updated task title (optional)",
  "description": "Updated task description (optional)",
  "completed": true
}
```
- **Response**: Updated task object if owned by authenticated user
- **Status Codes**: 200 (success), 400 (bad request), 401 (unauthorized), 404 (not found or not owned by user)

### 5. Toggle Task Completion
- **Method**: PATCH
- **Path**: `/api/tasks/{task_id}/toggle`
- **Description**: Toggle the completion status of a task, validating ownership by authenticated user
- **JWT Enforcement**: Confirms task.user_id matches user_id from JWT claims before toggling
- **Parameters**: task_id (path parameter)
- **Response**: Updated task object if owned by authenticated user
- **Status Codes**: 200 (success), 401 (unauthorized), 404 (not found or not owned by user)

### 6. Delete Task
- **Method**: DELETE
- **Path**: `/api/tasks/{task_id}`
- **Description**: Delete a specific task, validating ownership by authenticated user
- **JWT Enforcement**: Ensures task.user_id matches user_id from JWT claims before deletion
- **Parameters**: task_id (path parameter)
- **Response**: Empty body on successful deletion
- **Status Codes**: 204 (deleted), 401 (unauthorized), 404 (not found or not owned by user)

## User Isolation Guarantees
- Users can only access, modify, or delete their own tasks
- Attempting to access another user's task results in 404 Not Found
- No user can view another user's tasks through any endpoint
- All database queries are filtered by the authenticated user's ID
- FastAPI middleware enforces user ownership validation on every request