export const handleApiError = (error, context = 'API call') => {
  console.error(`${context} failed:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Unable to connect to server. Please check if the backend is running.';
  }
  
  if (error.status === 500) {
    return 'Server error. Please try again later.';
  }
  
  if (error.status === 404) {
    return 'Service not found. Please check your connection.';
  }
  
  return error.message || 'An unexpected error occurred.';
};

export const createErrorState = (error, context) => ({
  hasError: true,
  error: handleApiError(error, context),
  timestamp: new Date().toISOString()
});
