# ClassFlow Web Conversion Plan

## 📱 Original Flutter App Overview

**ClassFlow** is a comprehensive student planner application with the following features:

### Core Features
1. **Authentication System**
   - Sign In / Sign Up
   - Password management
   - Session persistence

2. **Event Management**
   - Multiple event types: Class, Assignment, Exam, Deadline, Meeting, Personal, Other
   - Event properties: title, classification, category, start/end time, location, notes
   - Attachments and voice notes
   - Priority levels (low, medium, high, critical)
   - Completion tracking
   - Reminders
   - All-day events support

3. **Timetable System**
   - Recurring class schedules
   - Course details (name, code, instructor, room)
   - Weekly schedule view
   - Semester start/end dates
   - Excluded dates for holidays

4. **Attendance Tracking**
   - Mark attendance (Present, Absent, Late, Excused)
   - Attendance statistics per course
   - Overall attendance percentage
   - Class-wise attendance history

5. **Calendar & Timeline**
   - Month view calendar
   - Daily timeline
   - Event filtering
   - Quick navigation

6. **Categories**
   - Custom categories for organizing events
   - Color coding
   - Icon support

7. **UI Features**
   - Light/Dark theme
   - Smooth animations
   - Modern Material Design
   - Responsive layouts

## 🌐 Web Conversion Architecture

### Technology Stack

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local filesystem / Cloud storage (for voice notes & attachments)
- **Validation**: express-validator
- **Security**: bcrypt, helmet, cors, rate-limiting

#### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API + useReducer
- **HTTP Client**: Axios
- **UI Components**: Custom components with CSS Modules
- **Date Handling**: date-fns
- **Calendar**: react-calendar
- **Forms**: React Hook Form
- **Notifications**: react-toastify
- **Icons**: react-icons
- **Theme**: CSS Variables for light/dark mode

### Project Structure

```
software_mobile/
├── backend/                    # Node.js Backend
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── jwt.js             # JWT configuration
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Event.js           # Event model
│   │   ├── TimetableEntry.js  # Timetable model
│   │   ├── AttendanceRecord.js # Attendance model
│   │   └── Category.js        # Category model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── events.js          # Event CRUD routes
│   │   ├── timetable.js       # Timetable routes
│   │   ├── attendance.js      # Attendance routes
│   │   └── categories.js      # Category routes
│   ├── middleware/
│   │   ├── auth.js            # JWT verification
│   │   ├── errorHandler.js    # Error handling
│   │   └── validation.js      # Input validation
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── timetableController.js
│   │   ├── attendanceController.js
│   │   └── categoryController.js
│   ├── utils/
│   │   ├── dateHelpers.js     # Date manipulation utilities
│   │   └── fileUpload.js      # File handling
│   ├── .env                   # Environment variables
│   ├── server.js              # Express app entry point
│   └── package.json
│
├── frontend/                   # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   │       └── selogo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignupForm.jsx
│   │   │   ├── events/
│   │   │   │   ├── EventCard.jsx
│   │   │   │   ├── EventList.jsx
│   │   │   │   ├── AddEventDialog.jsx
│   │   │   │   └── EventFilters.jsx
│   │   │   ├── timetable/
│   │   │   │   ├── TimetableGrid.jsx
│   │   │   │   ├── AddTimetableDialog.jsx
│   │   │   │   └── TimetableCard.jsx
│   │   │   ├── attendance/
│   │   │   │   ├── AttendanceStats.jsx
│   │   │   │   ├── AttendanceCalendar.jsx
│   │   │   │   └── CourseAttendance.jsx
│   │   │   └── calendar/
│   │   │       ├── CalendarView.jsx
│   │   │       └── TimelineView.jsx
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── CalendarPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── TimetablePage.jsx
│   │   │   ├── AttendancePage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── DataContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useEvents.js
│   │   │   ├── useTimetable.js
│   │   │   └── useAttendance.js
│   │   ├── services/
│   │   │   ├── api.js            # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── eventService.js
│   │   │   ├── timetableService.js
│   │   │   └── attendanceService.js
│   │   ├── utils/
│   │   │   ├── dateUtils.js
│   │   │   ├── colorUtils.js
│   │   │   └── validators.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── variables.css      # CSS custom properties
│   │   │   └── themes.css         # Light/Dark themes
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
└── WEB_CONVERSION_PLAN.md     # This file
```

## 🔄 Data Model Mapping

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date,
  preferences: {
    theme: String, // 'light' | 'dark' | 'system'
    defaultView: String
  }
}
```

### Event Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  classification: String, // 'class' | 'exam' | 'assignment' | 'deadline' | 'meeting' | 'personal' | 'other'
  category: ObjectId (ref: Category),
  startTime: Date,
  endTime: Date,
  location: String,
  notes: String,
  attachments: [String], // File paths
  voiceNotes: [{
    id: String,
    filePath: String,
    recordedAt: Date,
    duration: Number,
    tags: [String]
  }],
  isCompleted: Boolean,
  priority: String, // 'low' | 'medium' | 'high' | 'critical'
  estimatedDuration: String,
  isAllDay: Boolean,
  isImportant: Boolean,
  reminders: [Date],
  color: String,
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### TimetableEntry Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  courseName: String,
  courseCode: String,
  instructor: String,
  room: String,
  daysOfWeek: [Number], // 1-7 (Monday-Sunday)
  startTime: String, // "HH:mm"
  endTime: String, // "HH:mm"
  category: ObjectId (ref: Category),
  color: String,
  semesterStart: Date,
  semesterEnd: Date,
  excludedDates: [String], // ISO date strings
  createdAt: Date,
  updatedAt: Date
}
```

### AttendanceRecord Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  courseName: String,
  date: Date,
  status: String, // 'present' | 'absent' | 'late' | 'excused'
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  color: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout user

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PATCH /api/events/:id/complete` - Toggle completion
- `GET /api/events/day/:date` - Get events for specific day
- `GET /api/events/range` - Get events in date range
- `GET /api/events/upcoming` - Get upcoming deadlines

### Timetable
- `GET /api/timetable` - Get all timetable entries
- `GET /api/timetable/:id` - Get single entry
- `POST /api/timetable` - Create timetable entry
- `PUT /api/timetable/:id` - Update entry
- `DELETE /api/timetable/:id` - Delete entry
- `GET /api/timetable/day/:dayOfWeek` - Get schedule for day
- `GET /api/timetable/date/:date` - Get schedule for specific date

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/course/:courseName` - Get attendance for course
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance
- `DELETE /api/attendance/:id` - Delete attendance
- `GET /api/attendance/stats` - Get overall stats
- `GET /api/attendance/stats/:courseName` - Get course stats

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🎨 UI/UX Conversion

### Design System
- **Colors**: Match Flutter theme colors (classBlue, assignmentPurple, examOrange, etc.)
- **Typography**: Google Fonts (matching Flutter's google_fonts)
- **Spacing**: 4px base unit system
- **Animations**: CSS transitions + Framer Motion for complex animations
- **Responsive**: Mobile-first approach with breakpoints

### Key UI Components
1. **Dashboard** - Today's overview with stats cards
2. **Quick Actions** - Fast event creation buttons
3. **Event Cards** - Animated, color-coded event displays
4. **Calendar** - Month view with event indicators
5. **Timetable Grid** - Weekly schedule view
6. **Attendance Charts** - Visual statistics
7. **Theme Toggle** - Light/Dark mode switcher

## 🚀 Implementation Phases

### Phase 1: Backend Setup (Priority)
1. Initialize Node.js project
2. Set up MongoDB connection
3. Create data models
4. Implement authentication
5. Build REST API endpoints
6. Add validation & error handling

### Phase 2: Frontend Foundation
1. Initialize React + Vite project
2. Set up routing
3. Create context providers
4. Build authentication flow
5. Implement API service layer

### Phase 3: Core Features
1. Event management UI
2. Calendar integration
3. Timetable system
4. Attendance tracking
5. Category management

### Phase 4: Polish & Enhancement
1. Animations & transitions
2. Theme system
3. Responsive design
4. Error handling & loading states
5. File upload (voice notes, attachments)

### Phase 5: Testing & Deployment
1. API testing
2. Frontend testing
3. Integration testing
4. Performance optimization
5. Deployment setup

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "express-validator": "^7.0.1",
  "multer": "^1.4.5-lts.1",
  "express-rate-limit": "^7.1.5"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "date-fns": "^3.0.0",
  "react-calendar": "^4.7.0",
  "react-hook-form": "^7.48.2",
  "react-toastify": "^9.1.3",
  "react-icons": "^4.12.0",
  "framer-motion": "^10.16.16"
}
```

## 🔐 Security Considerations

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Tokens**: Secure token generation with expiry
3. **Input Validation**: Server-side validation for all inputs
4. **CORS**: Configured for specific origins
5. **Rate Limiting**: Prevent brute force attacks
6. **Helmet**: Security headers
7. **Environment Variables**: Sensitive data in .env

## 🎯 Next Steps

1. Start with backend setup
2. Create database models
3. Implement authentication
4. Build REST API
5. Create React frontend
6. Integrate frontend with backend
7. Add advanced features
8. Test and deploy

---

**Ready to build?** Let's start with the backend implementation!
