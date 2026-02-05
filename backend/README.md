# ClassFlow Backend API

Backend REST API for the ClassFlow Student Planner web application.

## Features

- **Authentication**: JWT-based user authentication
- **Events Management**: Create, read, update, delete events with various classifications
- **Timetable System**: Manage recurring class schedules
- **Attendance Tracking**: Track and analyze attendance records
- **Categories**: Organize events with custom categories
- **Statistics**: Get insights and analytics on events and attendance

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate Limiting** for API protection

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/classflow
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)
- `PUT /api/auth/password` - Update password (Protected)

### Events
- `GET /api/events` - Get all events (Protected)
- `GET /api/events/:id` - Get single event (Protected)
- `POST /api/events` - Create event (Protected)
- `PUT /api/events/:id` - Update event (Protected)
- `DELETE /api/events/:id` - Delete event (Protected)
- `PATCH /api/events/:id/complete` - Toggle completion (Protected)
- `GET /api/events/day/:date` - Get events for specific day (Protected)
- `GET /api/events/range?startDate=&endDate=` - Get events in range (Protected)
- `GET /api/events/upcoming` - Get upcoming deadlines (Protected)
- `GET /api/events/stats/today` - Get today's stats (Protected)
- `GET /api/events/counts/:date` - Get counts for day (Protected)

### Timetable
- `GET /api/timetable` - Get all timetable entries (Protected)
- `GET /api/timetable/:id` - Get single entry (Protected)
- `POST /api/timetable` - Create entry (Protected)
- `PUT /api/timetable/:id` - Update entry (Protected)
- `DELETE /api/timetable/:id` - Delete entry (Protected)
- `GET /api/timetable/day/:dayOfWeek` - Get schedule for day (1-7) (Protected)
- `GET /api/timetable/date/:date` - Get schedule for date (Protected)

### Attendance
- `GET /api/attendance` - Get all records (Protected)
- `POST /api/attendance` - Mark attendance (Protected)
- `PUT /api/attendance/:id` - Update record (Protected)
- `DELETE /api/attendance/:id` - Delete record (Protected)
- `GET /api/attendance/course/:courseName` - Get course attendance (Protected)
- `GET /api/attendance/stats` - Get all stats (Protected)
- `GET /api/attendance/stats/:courseName` - Get course stats (Protected)

### Categories
- `GET /api/categories` - Get all categories (Protected)
- `GET /api/categories/:id` - Get single category (Protected)
- `POST /api/categories` - Create category (Protected)
- `PUT /api/categories/:id` - Update category (Protected)
- `DELETE /api/categories/:id` - Delete category (Protected)

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── jwt.js             # JWT utilities
├── controllers/
│   ├── authController.js
│   ├── eventController.js
│   ├── timetableController.js
│   ├── attendanceController.js
│   └── categoryController.js
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── errorHandler.js    # Error handling
├── models/
│   ├── User.js
│   ├── Event.js
│   ├── TimetableEntry.js
│   ├── AttendanceRecord.js
│   └── Category.js
├── routes/
│   ├── auth.js
│   ├── events.js
│   ├── timetable.js
│   ├── attendance.js
│   └── categories.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js              # Entry point
└── README.md
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Responses

Successful responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "count": 10  // For list endpoints
}
```

## License

ISC
