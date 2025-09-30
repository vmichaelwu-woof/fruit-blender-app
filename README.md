# 🥤 Fruit Blender - Full Stack Application

A modern full-stack fruit blending application built with Next.js frontend and Express.js backend.

## 🏗️ Architecture

This is a **monorepo** containing both frontend and backend applications:

```
fruit-blender/
├── backend/          # Express.js API server
├── frontend/         # Next.js React application
├── package.json      # Root package.json for monorepo management
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install all dependencies (root, backend, and frontend)
npm run install:all

# Or install manually:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Development
```bash
# Start both backend and frontend in development mode
npm run dev

# Or start them separately:
npm run dev:backend    # Backend on http://localhost:3001
npm run dev:frontend   # Frontend on http://localhost:3000
```

### Production
```bash
# Build frontend
npm run build

# Start both in production mode
npm start
```

## 📊 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Simple hello message |
| GET | `/api/fruits` | Get available fruits |
| GET | `/api/cart` | Get cart and blend history |
| POST | `/api/cart` | Cart operations (add, remove, blend) |
| GET | `/api/health` | Health check |
| GET | `/api/docs` | API documentation |

## 🎯 Frontend Features

- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Real-time Updates** - Instant cart updates and history tracking
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during operations
- **Mobile Responsive** - Works on all device sizes

## 🔧 Development

### File Structure
```
fruit-blender/
├── backend/
│   ├── server.js          # Express server
│   ├── config.js          # Configuration
│   ├── constants.js       # App constants
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── utils/         # Utility functions
│   │   └── constants/     # Application constants
│   └── package.json       # Frontend dependencies
└── package.json           # Root monorepo configuration
```

### Available Scripts

#### Root Level (Monorepo)
- `npm run dev` - Start both backend and frontend in development
- `npm run build` - Build frontend for production
- `npm run start` - Start both in production mode
- `npm run install:all` - Install all dependencies
- `npm run lint` - Lint frontend code

#### Backend Only
- `npm run dev:backend` - Start backend in development mode
- `npm run start:backend` - Start backend in production mode

#### Frontend Only
- `npm run dev:frontend` - Start frontend in development mode
- `npm run build:frontend` - Build frontend for production
- `npm run start:frontend` - Start frontend in production mode

## 🔗 Backend Integration

### API Configuration
The frontend connects to the backend API via environment variables:

```bash
# Development (default)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Production
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### CORS Configuration
The backend supports multiple frontend origins:
- Development: `http://localhost:3000`
- Production: Configure via `ALLOWED_ORIGINS` environment variable

## 🚀 Deployment Options

### Option 1: Deploy Separately (Recommended)
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3
- **Backend**: Deploy to Railway, Heroku, or AWS EC2

### Option 2: Deploy Together
- Use Docker Compose for local development
- Deploy to a single server with reverse proxy (nginx)

### Option 3: Container Deployment
```bash
# Build and run with Docker
docker-compose up --build
```

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:3001/api/health

# Test fruits endpoint
curl http://localhost:3001/api/fruits

# Test cart operations
curl -X POST http://localhost:3001/api/cart \
  -H "Content-Type: application/json" \
  -d '{"action": "add", "fruitId": "banana"}'
```

## 📊 Monitoring

- **Health Check**: `GET /api/health`
- **API Docs**: `GET /api/docs`
- **Request Logging**: All requests logged to console
- **Error Tracking**: Comprehensive error handling

## 🎯 Benefits of Monorepo Structure

1. **Unified Development** - Single repository for full-stack development
2. **Shared Dependencies** - Common packages managed at root level
3. **Consistent Tooling** - Same linting, formatting, and build tools
4. **Easy Deployment** - Deploy both applications together or separately
5. **Team Collaboration** - Single repository for team members
6. **Version Control** - Single git history for entire application

## 🔄 Data Flow

```
Frontend (Next.js) → HTTP Request → Backend (Express) → Business Logic → Response
```

## 📈 Performance

- **Next.js Optimization** - Automatic code splitting and optimization
- **Static Generation** - Pre-rendered pages for better performance
- **Image Optimization** - Automatic image optimization
- **Bundle Analysis** - Built-in bundle analyzer

This is now a complete full-stack application ready for development and deployment! 🎯
