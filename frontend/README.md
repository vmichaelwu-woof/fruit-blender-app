# 🥤 Fruit Blender Frontend

A modern Next.js frontend application for the Fruit Blender shop.

## 🏗️ Architecture

This is a **standalone frontend** that communicates with a separate backend API.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend API running (see fruit-blender-backend)

### Installation
```bash
cd fruit-blender-frontend
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 🔗 Backend Integration

### API Configuration
The frontend connects to the backend API via environment variables:

```bash
# Development (default)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Production
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Backend Requirements
- Backend must be running on port 3001 (development)
- CORS must be configured to allow frontend origin
- API endpoints must be available

## 📊 Features

- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Real-time Updates** - Instant cart updates and history tracking
- **Error Handling** - User-friendly error messages
- **Loading States** - Visual feedback during operations
- **Mobile Responsive** - Works on all device sizes

## 🎯 Components

- **Sidebar** - Navigation between Shop and History
- **ShopPage** - Fruit shopping interface
- **HistoryPage** - Blend history display
- **BlenderCart** - Cart management with blending
- **FruitCard** - Individual fruit display
- **LoadingSpinner** - Loading states

## 🔧 Development

### File Structure
```
src/
├── app/                 # Next.js app directory
├── components/         # React components
├── hooks/             # Custom React hooks
├── services/          # API service layer
├── utils/              # Utility functions
└── constants/         # Application constants
```

### Key Features
- **ES6 Modules** - Modern JavaScript throughout
- **Custom Hooks** - Reusable state management
- **Service Layer** - Clean API communication
- **Error Boundaries** - Comprehensive error handling
- **TypeScript Ready** - Easy to add TypeScript

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Connect to Vercel
vercel login
vercel --prod
```

### Option 2: Netlify
```bash
# Build and deploy
npm run build
# Upload dist folder to Netlify
```

### Option 3: AWS S3 + CloudFront
```bash
# Build static files
npm run build
# Upload to S3 bucket
```

## 🔄 Environment Variables

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Production
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## 🎯 Benefits of Separation

1. **Independent Deployment** - Deploy frontend and backend separately
2. **Technology Flexibility** - Use any frontend framework
3. **Team Separation** - Different teams can work independently
4. **Scalability** - Scale frontend and backend independently
5. **CDN Optimization** - Frontend can be served from CDN
6. **Better Caching** - Static assets can be cached separately

## 🧪 Testing

```bash
# Run development server
npm run dev

# Test in browser
http://localhost:3000
```

## 📊 Performance

- **Next.js Optimization** - Automatic code splitting and optimization
- **Static Generation** - Pre-rendered pages for better performance
- **Image Optimization** - Automatic image optimization
- **Bundle Analysis** - Built-in bundle analyzer

This frontend is now completely independent and can be deployed anywhere! 🎯
