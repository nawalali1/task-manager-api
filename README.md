# Task Manager REST API

A lightweight REST API for managing tasks, built with Node.js and Express. This project demonstrates fundamental backend development skills including RESTful API design, file-based data persistence, and error handling.

## Overview

This API provides a simple task management system where users can create, retrieve, update, and delete tasks. Tasks are stored in a JSON file rather than a database, making the project easy to set up and deploy without additional infrastructure requirements.

Each task contains the following properties:
- Unique identifier
- Title
- Description
- Completion status
- Created timestamp
- Last updated timestamp

## Requirements

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository or download the project files

2. Navigate to the project directory:
```bash
cd task-manager-api
```

3. Install the dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm start
```

For development with automatic restart on file changes:
```bash
npm run dev
```

The server will run on port 3000 by default. You can access it at `http://localhost:3000`

## API Endpoints

### Root Endpoint

**GET /**

Returns API information and available endpoints.

Response:
```json
{
  "message": "Task Manager REST API",
  "version": "1.0.0",
  "endpoints": {
    "GET /tasks": "List all tasks",
    "GET /tasks/:id": "Get a specific task",
    "POST /tasks": "Create a new task",
    "PUT /tasks/:id": "Update a task",
    "DELETE /tasks/:id": "Delete a task"
  }
}
```

### List All Tasks

**GET /tasks**

Retrieves all tasks.

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "1699876543210",
      "title": "Complete project documentation",
      "description": "Write comprehensive README file",
      "completed": false,
      "createdAt": "2024-11-13T10:15:43.210Z",
      "updatedAt": "2024-11-13T10:15:43.210Z"
    }
  ]
}
```

### Get a Specific Task

**GET /tasks/:id**

Retrieves a single task by its ID.

Response (success):
```json
{
  "success": true,
  "data": {
    "id": "1699876543210",
    "title": "Complete project documentation",
    "description": "Write comprehensive README file",
    "completed": false,
    "createdAt": "2024-11-13T10:15:43.210Z",
    "updatedAt": "2024-11-13T10:15:43.210Z"
  }
}
```

Response (not found):
```json
{
  "success": false,
  "error": "Task not found"
}
```

### Create a New Task

**POST /tasks**

Creates a new task.

Request body:
```json
{
  "title": "Learn Express.js",
  "description": "Complete Express.js tutorial"
}
```

Note: The `title` field is required. The `description` field is optional.

Response:
```json
{
  "success": true,
  "data": {
    "id": "1699876543210",
    "title": "Learn Express.js",
    "description": "Complete Express.js tutorial",
    "completed": false,
    "createdAt": "2024-11-13T10:15:43.210Z",
    "updatedAt": "2024-11-13T10:15:43.210Z"
  }
}
```

### Update a Task

**PUT /tasks/:id**

Updates an existing task. You can update the title, description, or completion status.

Request body (all fields are optional):
```json
{
  "title": "Learn Express.js fundamentals",
  "description": "Complete beginner Express.js tutorial",
  "completed": true
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "1699876543210",
    "title": "Learn Express.js fundamentals",
    "description": "Complete beginner Express.js tutorial",
    "completed": true,
    "createdAt": "2024-11-13T10:15:43.210Z",
    "updatedAt": "2024-11-13T14:30:22.105Z"
  }
}
```

### Delete a Task

**DELETE /tasks/:id**

Deletes a task by its ID.

Response:
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": "1699876543210",
    "title": "Learn Express.js fundamentals",
    "description": "Complete beginner Express.js tutorial",
    "completed": true,
    "createdAt": "2024-11-13T10:15:43.210Z",
    "updatedAt": "2024-11-13T14:30:22.105Z"
  }
}
```

## Testing the API

You can test the API using tools like:
- Postman
- Insomnia
- cURL
- Thunder Client (VS Code extension)

Example cURL commands:
```bash
# List all tasks
curl http://localhost:3000/tasks

# Create a new task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread"}'

# Get a specific task
curl http://localhost:3000/tasks/1699876543210

# Update a task
curl -X PUT http://localhost:3000/tasks/1699876543210 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1699876543210
```

## Project Structure
```
task-manager-api/
├── data/
│   └── tasks.json          # Task data storage
├── server.js               # Main application file
├── package.json            # Project dependencies and scripts
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## Error Handling

The API includes error handling for common scenarios:
- Invalid task ID (404 Not Found)
- Missing required fields (400 Bad Request)
- Server errors (500 Internal Server Error)

All error responses follow a consistent format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Future Improvements

This project is intentionally kept simple for portfolio purposes. Potential enhancements could include:

- Database integration (MongoDB, PostgreSQL, or SQLite)
- User authentication and authorisation
- Task filtering and sorting capabilities
- Due dates and priority levels for tasks
- Task categories or tags
- Search functionality
- Input validation using a library such as Joi or express-validator
- Comprehensive unit and integration tests
- API rate limiting
- CORS configuration for frontend integration
- Pagination for large task lists
- Environment-based configuration
- Logging system for debugging and monitoring

## Licence

This project is open source and available under the MIT Licence.