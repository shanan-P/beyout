# Beyout - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check PostgreSQL (should be 14+)
psql --version
```

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/beyout.git
cd beyout

# Copy environment variables
cp .env.example .env
```

### 2. Configure Environment
Edit `.env` file with your settings:
```env
# Minimum required for development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=beyout_db
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Database Setup
```bash
# Create database
createdb beyout_db

# Or using psql
psql -U postgres -c "CREATE DATABASE beyout_db;"
```

### 4. Install Dependencies
```bash
# Install all dependencies (root, backend, and frontend)
npm run install:all
```

### 5. Run Migrations
```bash
cd backend
npm run migrate
cd ..
```

### 6. Start Development
```bash
# From root directory - starts both backend and frontend
npm run dev
```

## 🎉 You're Ready!

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 📱 First Steps

### 1. Create Your First User
- Navigate to http://localhost:3000/signup
- Create an account (you can use a fake email for development)

### 2. Explore the UI
- Check out the dashboard
- Try creating a course from a YouTube playlist
- Explore the profile page

### 3. Test Real-time Features
- Open two browser windows
- Login with different accounts
- Try sending messages or creating posts

## 🛠️ Common Development Tasks

### Running Only Backend
```bash
cd backend
npm run dev
```

### Running Only Frontend
```bash
cd frontend
npm run dev
```

### Database Commands
```bash
# Run new migrations
cd backend
npm run migrate

# Rollback migrations
cd backend
npx knex migrate:rollback

# Create new migration
cd backend
npx knex migrate:make migration_name
```

### Adding Dependencies
```bash
# Backend dependency
cd backend
npm install package-name

# Frontend dependency
cd frontend
npm install package-name
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
1. Check PostgreSQL is running:
   ```bash
   sudo service postgresql status
   ```

2. Verify credentials in `.env` file

3. Ensure database exists:
   ```bash
   psql -U postgres -l | grep beyout_db
   ```

### Module Not Found Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm run install:all
```

## 🔥 Hot Tips

1. **VS Code Extensions**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - Thunder Client (for API testing)

2. **Database GUI**
   - Use TablePlus, DBeaver, or pgAdmin to view your database

3. **API Testing**
   - Use Postman or Thunder Client
   - Backend runs on http://localhost:5000/api

4. **React DevTools**
   - Install React Developer Tools browser extension
   - Great for debugging component state

5. **Environment Variables**
   - Never commit `.env` file
   - Use `.env.example` as reference
   - Different `.env` files for different environments

## 📚 Next Steps

1. Read the [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) to understand the architecture
2. Check the [README.md](../README.md) for detailed documentation
3. Start implementing features from the todo list
4. Join our Discord/Slack for questions (if available)

## 💡 Pro Tips

- Use `npm run dev` from root - it's the easiest way
- Keep the terminal open to see real-time errors
- Check browser console for frontend errors
- Check terminal for backend errors
- Database migrations are your friend - use them!

Happy coding! 🎯