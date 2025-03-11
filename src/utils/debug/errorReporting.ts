interface ErrorDetails {
  componentStack?: string;
  extra?: Record<string, any>;
}

export const captureException = (error: Error, details?: ErrorDetails) => {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error caught:', error);
    if (details?.componentStack) {
      console.error('Component stack:', details.componentStack);
    }
    if (details?.extra) {
      console.error('Additional info:', details.extra);
    }
    return;
  }

  // In production, you would send to your error tracking service
  // Example with a hypothetical error tracking service:
  try {
    const errorData = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...details,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Send to your error tracking service
    // errorTrackingService.captureException(errorData);
    
    // For now, log to console in a structured way
    console.error('Production Error:', errorData);
  } catch (e) {
    // Fallback error logging
    console.error('Failed to report error:', e);
  }
};