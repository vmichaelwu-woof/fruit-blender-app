# Fruit Blender

A full-stack application for creating fruit smoothies with Next.js frontend and Express backend, integrated with Datadog RUM monitoring.

## Project Structure

```
fruit-blender/
├── backend/              # Express API server
├── frontend/             # Next.js application
├── scripts/              # Utility scripts
│   ├── generate-traffic.js      # HTTP traffic generator
│   └── generate-rum-traffic.js  # Browser-based RUM traffic generator
├── docs/                 # Documentation
└── package.json          # Root package configuration
```

## Quick Start

### Install Dependencies
```bash
npm run install:all
```

### Run Development Servers
```bash
npm run dev
```

This starts:
- Backend on http://localhost:3001
- Frontend on http://localhost:3000

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:backend` | Start only the backend server |
| `npm run dev:frontend` | Start only the frontend server |
| `npm run build` | Build the frontend for production |
| `npm start` | Start both servers in production mode |
| `npm run traffic` | Generate HTTP traffic to backend |
| `npm run traffic:rum` | Generate browser-based RUM sessions |
| `npm run lint` | Run ESLint on frontend code |

## Features

- **Shop**: Browse and add fruits to cart
- **Blend**: Create smoothies from selected fruits
- **History**: View past blend orders
- **Fruit Details**: Learn about each fruit (origin, nutrition, facts)
- **Datadog RUM**: Real-time user monitoring and session replay

## Tech Stack

### Frontend
- Next.js 15
- React 19
- Datadog Browser RUM SDK

### Backend
- Express 5
- Datadog APM (dd-trace)
- CORS enabled

## Routes

- `/shop` - Main shopping page
- `/history` - Blend history
- `/fruits/1` - Banana details
- `/fruits/2` - Apple details
- `/fruits/3` - Strawberry details

## API Endpoints

- `GET /api/fruits` - Get all fruits
- `GET /api/fruits/:id` - Get fruit details
- `GET /api/cart` - Get cart and history
- `POST /api/cart` - Add/remove items or blend
- `GET /api/health` - Health check

## Documentation

See the `/docs` folder for detailed documentation:
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)

## Requirements

- Node.js >= 18.0.0
- npm or yarn

## License

MIT
