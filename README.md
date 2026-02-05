# ClassFlow - Student Planner Web Application

A full-stack web application for managing academic life with events, timetables, attendance tracking, and more.

## 🎯 Project Overview

ClassFlow is a modern web application built with:
- **Backend**: Node.js + Express + MongoDB REST API
- **Frontend**: React + Vite with Material Design UI
- **Features**: Event management, timetable, attendance tracking, and more

## ✨ Features

### Core Functionality
- 🔐 **Authentication System** - JWT-based secure authentication
- 📅 **Event Management** - Create, edit, delete events (classes, assignments, exams, meetings, etc.)
- 📚 **Timetable System** - Manage recurring class schedules
- 📊 **Attendance Tracking** - Track and analyze attendance with statistics
- 🏷️ **Categories** - Organize events with custom categories
- 🌓 **Dark/Light Theme** - Toggle between themes with persistence
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### Event Types
- Classes
- Assignments
- Exams
- Deadlines
- Meetings
- Personal events
- Other

## 🏗️ Project Structure

```
classflow/
├── backend/                    # Node.js Backend
│   ├── config/                # Database & JWT config
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Auth & error handling
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── README.md              # Backend documentation
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React contexts
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── .env                   # Environment variables
│   └── package.json           # Dependencies
│
└── Documentation files
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Navigate to the project**
```bash
cd software_mobile
```

2. **Set up Backend**
```bash
cd backend
npm install
```

3. **Configure Backend Environment**
Create a `.env` file in the `backend` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/classflow
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

4. **Set up Frontend**
```bash
cd ../frontend
npm install
```

5. **Configure Frontend Environment**
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server** (in `backend` directory)
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

3. **Start Frontend** (in `frontend` directory, new terminal)
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

4. **Access the Application**
Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### First Time Setup

1. **Register an Account**
   - Click "Sign Up" on the auth page
   - Enter your name, email, and password
   - You'll be automatically logged in

2. **Explore the Dashboard**
   - View today's stats (classes, tasks, exams, meetings)
   - Toggle between light and dark themes
   - Access quick actions

3. **Create Your First Event**
   - Use the quick action buttons
   - Or navigate to the Events page
   - Fill in event details and save

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `GET /api/events/stats/today` - Get today's stats

### Timetable
- `GET /api/timetable` - Get all timetable entries
- `POST /api/timetable` - Create timetable entry
- `GET /api/timetable/day/:dayOfWeek` - Get schedule for day

### Attendance
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/stats` - Get overall stats

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category

See `backend/README.md` for complete API documentation.

## 🎨 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **Material Design Icons** - UI icons

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Rate limiting
- Input validation
- Error handling

## 🎯 Development Roadmap

### ✅ Completed
- [x] Backend API setup
- [x] Database models
- [x] Authentication system
- [x] Event CRUD operations
- [x] Timetable management
- [x] Attendance tracking
- [x] Category management
- [x] Frontend setup
- [x] Auth pages
- [x] Home dashboard
- [x] Theme system
- [x] Exact Material Design UI

### 🚧 Ready to Implement
- [ ] Complete all frontend pages
- [ ] Event creation/editing UI
- [ ] Calendar view
- [ ] Timetable grid view
- [ ] Attendance statistics UI
- [ ] Voice notes feature
- [ ] File attachments
- [ ] Notifications system
- [ ] Search functionality

## 📝 Documentation

- **README.md** (this file) - Main project overview
- **QUICK_START.md** - Step-by-step setup guide
- **CONVERSION_COMPLETE.md** - Project completion details
- **UI_DESIGN_MATCH.md** - UI design specifications
- **WEB_CONVERSION_PLAN.md** - Architecture documentation
- **FLUTTER_CLEANUP.md** - Cleanup summary
- **backend/README.md** - Backend API documentation

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your needs.

## 📝 License

ISC

## 🙏 Acknowledgments

- React and Node.js communities
- MongoDB documentation
- Vite team
- Material Design

## 📞 Support

For setup help, check:
1. `QUICK_START.md` for detailed setup instructions
2. `backend/README.md` for API documentation
3. Console logs for errors

---

**Built with ❤️ using React and Node.js**
