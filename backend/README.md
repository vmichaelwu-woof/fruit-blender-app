# 🚀 Fruit Blender Backend API

A standalone Express.js backend API for the Fruit Blender application.

## 🏗️ Architecture

This is a **standalone backend** that can be deployed independently and serve multiple frontend applications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd fruit-blender-backend
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | Simple hello message |
| GET | `/api/fruits` | Get available fruits |
| GET | `/api/cart` | Get cart and blend history |
| POST | `/api/cart` | Cart operations (add, remove, blend) |
| GET | `/api/health` | Health check |
| GET | `/api/docs` | API documentation |

## 🔧 Configuration

### Environment Variables
```bash
PORT=3001                           # Server port
NODE_ENV=development                 # Environment
ALLOWED_ORIGINS=http://localhost:3000  # CORS origins (comma-separated)
```

### CORS Configuration
The API supports multiple frontend origins:
- Development: `http://localhost:3000`
- Production: Configure via `ALLOWED_ORIGINS`

## 🚀 Deployment Options

### Option 1: Railway
```bash
# Connect to Railway
railway login
railway init
railway up
```

### Option 2: Heroku
```bash
# Create Heroku app
heroku create fruit-blender-api
git push heroku main
```

### Option 3: AWS/DigitalOcean
- Use PM2 for process management
- Configure reverse proxy (nginx)
- Set up SSL certificates

## 📈 Features

- **RESTful API** - Clean, predictable endpoints
- **CORS Support** - Multiple frontend origins
- **Error Handling** - Comprehensive error responses
- **Health Checks** - Monitoring and status endpoints
- **API Documentation** - Built-in docs endpoint
- **Request Logging** - All requests logged with timestamps

## 🔄 Data Flow

```
Frontend App → HTTP Request → Express API → Business Logic → Response
```

## 🎯 Benefits of Separation

1. **Independent Deployment** - Deploy backend and frontend separately
2. **Scalability** - Scale backend independently
3. **Team Separation** - Different teams can work on frontend/backend
4. **Multiple Frontends** - One API can serve web, mobile, desktop apps
5. **Technology Flexibility** - Use any frontend framework
6. **Better Testing** - Test API independently
7. **Microservices Ready** - Easy to split into multiple services

## 🧪 Testing

```bash
# Test health endpoint
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

This backend is now completely independent and can be deployed anywhere! 🎯
