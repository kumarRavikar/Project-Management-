# Task Management API

This is a simple task management API built using Node.js and Express.

## Endpoints

### 1. Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Response:** 
  - **Status:** 200 OK
  - **Body:**
    ```json
    [
        {"id": 1, "task": "Learn Node.js", "completed": false},
        {"id": 2, "task": "Build a task management tool", "completed": false}
    ]
    ```

### 2. Create a New Task
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Request Body:** 
  ```json
  {
      "task": "Task description",
      "completed": false
  }
