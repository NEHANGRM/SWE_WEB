# ClassFlow Quick Start Guide

## Prerequisites Check

Before starting, make sure you have:
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] npm or yarn installed

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/classflow
JWT_SECRET=classflow_secret_key_2026_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 5. Access the Application

Open your browser and go to: **http://localhost:5173**

### 6. Create Your First Account

1. Click **"Sign Up"**
2. Enter:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123 (min 6 characters)
3. Click **"Sign Up"**
4. You'll be automatically logged in!

### 7. Explore Features

- ✅ View dashboard with today's stats
- ✅ Toggle dark/light theme (moon/sun icon)
- ✅ Logout and login again
- ✅ Check the API at http://localhost:5000/api/health

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB Connection Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Can't Connect to Backend
```
Network Error
```
**Solution**: 
1. Check backend is running on port 5000
2. Check `.env` file in frontend has correct API URL
3. Check CORS settings in backend

### Dependencies Installation Failed
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Testing the API

### Using curl:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Events (with token):**
```bash
curl -X GET http://localhost:5000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Next Steps

1. ✅ Application is running
2. ✅ You can register and login
3. ✅ Dashboard displays correctly
4. 🚧 Start building additional features:
   - Event creation UI
   - Calendar view
   - Timetable grid
   - Attendance tracking

## Useful Commands

**Backend:**
```bash
npm run dev      # Start with auto-reload
npm start        # Start production mode
```

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

**MongoDB:**
```bash
mongod                    # Start MongoDB
mongo                     # Open MongoDB shell
mongosh                   # Open MongoDB shell (newer versions)
```

## File Locations

- Backend code: `backend/`
- Frontend code: `frontend/src/`
- API documentation: `backend/README.md`
- Architecture: `WEB_CONVERSION_PLAN.md`

## Support

If you encounter issues:
1. Check the console logs (both backend and frontend)
2. Review `CONVERSION_COMPLETE.md` for troubleshooting
3. Check `backend/README.md` for API details

---

**Happy Coding! 🚀**
