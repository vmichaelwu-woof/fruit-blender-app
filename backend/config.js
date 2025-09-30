export const config = {
  port: process.env.PORT || 3001,
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'],
  environment: process.env.NODE_ENV || 'development'
};
