# MongoDB Setup Guide

## ❌ Error: MongoDB Connection Refused

You're seeing this error because MongoDB is not running on your computer.

```
❌ MongoDB Connection Error: connect ECONNREFUSED ::1:27017
```

---

## ✅ Solution: Choose One Option

### **Option 1: Install and Run MongoDB Locally** (Best for development)

#### Step 1: Install MongoDB
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB Compass (GUI) will also be installed

#### Step 2: Start MongoDB
Open a terminal and run:
```bash
mongod
```

Keep this terminal open while using ClassFlow.

#### Step 3: Restart Backend
```bash
cd backend
npm run dev
```

You should see: `✅ MongoDB Connected: localhost`

---

### **Option 2: Use MongoDB Atlas** (Free Cloud Database)

#### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (it's free!)
3. Create a new project

#### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (closest to you)
4. Click "Create Cluster" (takes 3-5 minutes)

#### Step 3: Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `classflow`
5. Password: Create a strong password (save it!)
6. User Privileges: "Read and write to any database"
7. Click "Add User"

#### Step 4: Allow Network Access
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

#### Step 5: Get Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://classflow:<password>@cluster0.xxxxx.mongodb.net/
   ```

#### Step 6: Update .env File
Open `backend/.env` and replace line 6:

**FROM:**
```env
MONGODB_URI=mongodb://localhost:27017/classflow
```

**TO:**
```env
MONGODB_URI=mongodb+srv://classflow:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/classflow?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD` with your actual password
- `cluster0.xxxxx` with your actual cluster address

#### Step 7: Restart Backend
```bash
cd backend
npm run dev
```

You should see: `✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net`

---

## 🎯 Recommended: Option 2 (MongoDB Atlas)

**Why?**
- ✅ No installation needed
- ✅ Free forever (512MB storage)
- ✅ Accessible from anywhere
- ✅ Automatic backups
- ✅ Better for learning and deployment

---

## 🚀 After MongoDB is Connected

1. **Backend**: Should show `✅ MongoDB Connected`
2. **Frontend**: Run `npm run dev` in frontend folder
3. **Open**: http://localhost:5173
4. **Sign Up**: Create your first account!

---

## ⚠️ Troubleshooting

### "mongod: command not found"
MongoDB is not installed. Use Option 2 (MongoDB Atlas) instead.

### "Authentication failed"
Check your username and password in the connection string.

### "IP not whitelisted"
Add your IP address in MongoDB Atlas Network Access.

---

**Need help?** Check the MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
