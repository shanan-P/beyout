# Beyout - YouTube to Course Platform

Beyout transforms YouTube playlists into structured courses with social learning features, providing a premium educational experience with community interaction and progress tracking.

## 🌟 Features

### Core Features
- **YouTube Playlist Conversion**: Convert any YouTube playlist into a structured course
- **Chapter-based Learning**: Videos split into chapters based on timestamps
- **Progress Tracking**: Track your learning progress with visual analytics
- **Certificates**: Get customized certificates upon course completion
- **Quizzes & Exercises**: AI-generated quizzes and links to relevant exercises

### Social Features
- **User Profiles**: Customizable profiles with activity tracking
- **Community Tab**: Interact with other learners and instructors
- **Private Messaging**: End-to-end encrypted messaging between users
- **Watch Together**: Synchronized video watching with friends
- **Follow System**: Follow instructors and other learners
- **Notifications**: Real-time and email notifications

### Authentication
- Standard email/password signup
- OAuth integration (GitHub, Google)
- Optional login (limited features without login)
- Special YouTuber accounts with verification

## 🚀 Tech Stack

### Backend
- Node.js with Express.js
- TypeScript
- PostgreSQL with Knex.js
- Socket.io for real-time features
- JWT for authentication
- Passport.js for OAuth
- Google Gemini API for AI features

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- React Query for data fetching
- Socket.io Client
- React Player for video playback

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis (for caching and sessions)
- Google Gemini API key
- OAuth credentials (Google, GitHub)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/beyout.git
cd beyout
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- Database credentials
- JWT secret
- OAuth credentials
- Email service credentials
- API keys

### 3. Install dependencies
```bash
npm run install:all
```

### 4. Set up the database
```bash
# Create database
createdb beyout_db

# Run migrations
cd backend
npm run migrate
```

### 5. Start the development servers
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend server on http://localhost:3000

## 🗂️ Project Structure

```
beyout/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── tests/              # Backend tests
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── stores/         # Zustand stores
│   │   ├── styles/         # Global styles
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── database/
│   ├── migrations/         # Database migrations
│   └── seeds/              # Database seeds
└── docs/                   # Documentation
```

## 🔧 Configuration

### Database Schema
The application uses PostgreSQL with the following main tables:
- `users` - User accounts and profiles
- `courses` - Converted YouTube playlists
- `chapters` - Video segments with timestamps
- `user_progress` - Learning progress tracking
- `certificates` - Completion certificates
- `community_posts` - Community discussions
- `private_messages` - Encrypted messages
- And more...

### Environment Variables
Key environment variables:
- `NODE_ENV` - Development/production mode
- `PORT` - Backend server port
- `DB_*` - Database configuration
- `JWT_SECRET` - JWT signing secret
- `GEMINI_API_KEY` - Google Gemini API key
- OAuth credentials for Google and GitHub

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📦 Building for Production

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build
```

## 🚀 Deployment

### Using Docker
```bash
docker-compose up -d
```

### Manual Deployment
1. Build the frontend and backend
2. Set up PostgreSQL and Redis
3. Configure environment variables
4. Run database migrations
5. Start the backend server
6. Serve the frontend build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Lead Developer - [Your Name]
- Contact: pancholiansh17@gmail.com

## 🙏 Acknowledgments

- YouTube for providing video content
- Google Gemini for AI capabilities
- All open-source contributors

---

**Note**: This is a development version. For production deployment, ensure all security measures are properly configured, including:
- HTTPS/SSL certificates
- Secure environment variables
- Rate limiting
- Input validation
- CORS configuration
- Database security