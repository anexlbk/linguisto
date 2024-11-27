const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Main routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/main/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML-CSS-login-page-template/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/sign up page/index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/translator-dashboeard/index2.html'));
});

app.get('/video-chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/video-chat/index.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/payment page/index.html'));
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404 error page/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});