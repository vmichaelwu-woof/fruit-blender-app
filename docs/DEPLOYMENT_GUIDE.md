# 🚀 Deployment Guide - Separated Frontend & Backend

## 🏗️ Architecture Overview

Your application is now **completely separated** into two independent applications:

```
fruit-blender-backend/     # Express API Server
fruit-blender-frontend/    # Next.js Frontend
```

## 📁 Project Structure

```
/Users/michael.wu/Desktop/tps-sandbox/
├── fruit-blender-backend/     # Backend API
│   ├── server.js              # Express server
│   ├── package.json           # Backend dependencies
│   ├── constants.js           # API data
│   ├── config.js              # Server configuration
│   └── README.md              # Backend documentation
├── fruit-blender-frontend/    # Frontend App
│   ├── src/                   # Next.js source code
│   ├── package.json           # Frontend dependencies
│   ├── next.config.mjs        # Next.js configuration
│   └── README.md              # Frontend documentation
└── DEPLOYMENT_GUIDE.md        # This guide
```

## 🚀 Deployment Options

### **Option 1: Separate Deployments (Recommended)**

#### **Backend Deployment:**
- **Railway**: `railway up` from backend directory
- **Heroku**: `git push heroku main` from backend directory
- **AWS**: Deploy to EC2 or Lambda
- **DigitalOcean**: Deploy to App Platform

#### **Frontend Deployment:**
- **Vercel**: `vercel --prod` from frontend directory
- **Netlify**: Connect GitHub repo
- **AWS S3**: Upload build files to S3 bucket
- **GitHub Pages**: Deploy from GitHub Actions

### **Option 2: Monorepo Deployment**

#### **Using Docker:**
```dockerfile
# Backend Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### **Backend Environment Variables:**
```bash
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### **Frontend Environment Variables:**
```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## 🎯 Benefits of Separation

### **1. Independent Scaling**
- Scale backend for high API load
- Scale frontend for high user traffic
- Use different hosting providers

### **2. Team Separation**
- Backend team works on API
- Frontend team works on UI
- Different deployment schedules

### **3. Technology Flexibility**
- Backend: Express, Fastify, or any API framework
- Frontend: Next.js, React, Vue, or any framework
- Easy to swap technologies

### **4. Deployment Flexibility**
- Deploy backend to serverless (Lambda, Vercel Functions)
- Deploy frontend to CDN (Vercel, Netlify, CloudFront)
- Different deployment strategies

## 🚀 Quick Start Commands

### **Development:**
```bash
# Terminal 1 - Backend
cd fruit-blender-backend
npm install
npm run dev

# Terminal 2 - Frontend
cd fruit-blender-frontend
npm install
npm run dev
```

### **Production:**
```bash
# Backend
cd fruit-blender-backend
npm install
npm start

# Frontend
cd fruit-blender-frontend
npm install
npm run build
npm start
```

## 🔄 Communication Flow

```
User Browser
     ↓
Frontend (Next.js)
     ↓ HTTP Request
Backend API (Express)
     ↓
Database/Storage
     ↓
Response
     ↓
Frontend UI Update
```

## 📊 Monitoring & Health Checks

### **Backend Health:**
- `GET /api/health` - Server status
- `GET /api/docs` - API documentation
- Request logging for debugging

### **Frontend Health:**
- Next.js built-in health checks
- Error boundaries for error handling
- Performance monitoring with DataDog RUM

## 🎯 Production Checklist

### **Backend:**
- [ ] Environment variables configured
- [ ] CORS origins set correctly
- [ ] Health check endpoint working
- [ ] Error handling implemented
- [ ] Request logging enabled

### **Frontend:**
- [ ] API URL configured
- [ ] Build process working
- [ ] Error boundaries implemented
- [ ] Loading states working
- [ ] Mobile responsive

## 🚀 Deployment Commands

### **Railway (Backend):**
```bash
cd fruit-blender-backend
railway login
railway init
railway up
```

### **Vercel (Frontend):**
```bash
cd fruit-blender-frontend
vercel login
vercel --prod
```

### **Docker (Both):**
```bash
# Build images
docker build -t fruit-blender-backend ./fruit-blender-backend
docker build -t fruit-blender-frontend ./fruit-blender-frontend

# Run containers
docker run -p 3001:3001 fruit-blender-backend
docker run -p 3000:3000 fruit-blender-frontend
```

## 🎉 Result

You now have **two completely independent applications** that can be:
- **Deployed separately** to different platforms
- **Scaled independently** based on needs
- **Developed by different teams**
- **Updated independently**
- **Monitored separately**

This is the **modern way** to build applications! 🚀✨
