// Define CORS options with '*' wildcard for allowing access from anywhere
const corsOptions = {
  // Allow access from any origin
  origin: "*",

  // Enable credentials (cookies, authorization headers) for cross-origin requests
  credentials: true,

  // Additional configurations can be added here as needed
};

// Export CORS options for use in your application
export { corsOptions };
