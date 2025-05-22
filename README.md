# School Management API

## Overview
This is a RESTful API for managing school information, built with Node.js, Express, and MySQL. The API allows users to add new schools and list schools sorted by distance from a given location.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Code Structure](#code-structure)

## Tech Stack

### Core Dependencies
- **Express (^5.1.0)**: Web framework for Node.js
- **MySQL2 (^3.14.1)**: MySQL client for Node.js
- **Body-Parser (^2.2.0)**: Middleware to parse request bodies
- **Dotenv (^16.5.0)**: Module to load environment variables from .env file

### Development Dependencies
- **Nodemon (^3.1.10)**: Utility for automatically restarting the server during development

## Environment Setup
The application uses the following environment variables defined in the `.env` file:

```
DB_HOST=bgherstyhxrbyaoaghfd-mysql.services.clever-cloud.com  # MySQL database host
DB_USER=uwg2s8liuilciqxe                                      # MySQL database username
DB_PASSWORD=iPCvmhUwrHWnh0mgzGIn                              # MySQL database password
DB_NAME=bgherstyhxrbyaoaghfd                                  # MySQL database name
DB_PORT=3306                                                  # MySQL database port
PORT=5000                                                     # Port on which the server runs
CONNECTION=mysql://user:password@host:port/database           # Full database connection string
```

## Database Setup
The application uses a MySQL database with a `schools` table. Here's the SQL to create the table:

```sql
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the required environment variables
4. Set up the database using the SQL commands provided above
5. Start the server:
   ```
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### 1. Add a School
- **URL**: `/api/addSchool`
- **Method**: `POST`
- **Description**: Adds a new school to the database

#### Request Body
```json
{
  "name": "ABC School",
  "address": "123 Education Street, City, Country",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

#### Success Response (201 Created)
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

#### Error Responses
- **400 Bad Request**
  ```json
  {
    "message": "Invalid input data"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Database error",
    "error": "Error details..."
  }
  ```

### 2. List Schools by Distance
- **URL**: `/api/listSchools`
- **Method**: `GET`
- **Description**: Returns a list of schools sorted by distance from the specified coordinates

#### Query Parameters
- `latitude`: User's latitude coordinate (required)
- `longitude`: User's longitude coordinate (required)

#### Example Request
```
GET /api/listSchools?latitude=12.9716&longitude=77.5946
```

#### Success Response (200 OK)
```json
[
  {
    "id": 2,
    "name": "Nearby School",
    "address": "456 Learning Avenue, City, Country",
    "latitude": 12.9720,
    "longitude": 77.5950,
    "created_at": "2023-05-20T10:30:00.000Z",
    "distance": 0.5
  },
  {
    "id": 1,
    "name": "ABC School",
    "address": "123 Education Street, City, Country",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "created_at": "2023-05-20T10:00:00.000Z",
    "distance": 2.3
  }
]
```

#### Error Responses
- **400 Bad Request**
  ```json
  {
    "message": "Invalid coordinates"
  }
  ```
- **500 Internal Server Error**
  ```json
  {
    "message": "Database error",
    "error": "Error details..."
  }
  ```

## Code Structure

```
school-management-api/
├── .env                    # Environment variables
├── app.js                  # Express application setup
├── server.js              # Server entry point
├── package.json           # Project dependencies
├── config/
│   └── db.js              # Database connection setup
├── controller/
│   └── school.controller.js # API endpoint implementations
├── routes/
│   └── school.routes.js   # API route definitions
└── utils/
    └── distance.util.js   # Utility for calculating distances
```

### Workflow
1. The server starts from `server.js`, which imports the Express app from `app.js`
2. `app.js` sets up middleware and routes
3. Routes in `school.routes.js` define API endpoints and connect them to controller functions
4. Controller functions in `school.controller.js` handle business logic and database operations
5. The distance utility in `distance.util.js` calculates the distance between coordinates using the Haversine formula
6. Database operations use the MySQL connection established in `db.js`

## Distance Calculation
The API uses the Haversine formula to calculate the distance between two points on the Earth's surface. This formula accounts for the Earth's curvature and returns the distance in kilometers.
