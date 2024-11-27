const config = {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    wsUrl: process.env.WS_URL || 'ws://localhost:8080',
    googleAuthUrl: 'https://accounts.google.com/o/oauth2/auth',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    supportEmail: 'support@linguisto.com',
    
    // Add other configuration values here
};

// Prevent modifications to config
Object.freeze(config); 