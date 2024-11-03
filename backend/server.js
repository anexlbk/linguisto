const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Load profiles from a JSON file
const profilesFilePath = path.join(__dirname, 'data/profiles.json');
let profiles = [];

// Load profiles on server start
fs.readFile(profilesFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error loading profiles:', err);
        return;
    }
    profiles = JSON.parse(data);
});

// Get all profiles
app.get('/api/profiles', (req, res) => {
    res.json(profiles);
});

// Add a new review
app.post('/api/reviews', (req, res) => {
    const { profileId, review } = req.body;
    const profile = profiles.find(p => p.id === profileId);
    
    if (profile) {
        profile.reviews.push(review);
        fs.writeFile(profilesFilePath, JSON.stringify(profiles, null, 2), err => {
            if (err) {
                return res.status(500).send('Error saving review');
            }
            res.status(200).send('Review added successfully');
        });
    } else {
        res.status(404).send('Profile not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
