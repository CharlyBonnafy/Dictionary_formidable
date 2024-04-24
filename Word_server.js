// Import required modules
console.log("Starting server...");
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define port
const PORT = process.env.PORT || 4200;

// Define paths to dictionary files
const engToFrDictionaryPath = path.join(__dirname, 'Complete_dictionary_engtofr.json');
const frToEngDictionaryPath = path.join(__dirname, 'Complete_dictionary_frtoeng.json');

// Endpoint to add a word to both dictionaries
app.post('/add-word', (req, res) => {
    const { frenchWord, englishWord } = req.body;
    if (!frenchWord || !englishWord) {
        res.status(400).send('Both French and English words are required.');
        return;
    }

    // Read current contents of dictionaries
    let engToFrDictionary = JSON.parse(fs.readFileSync(engToFrDictionaryPath, 'utf8'));
    let frToEngDictionary = JSON.parse(fs.readFileSync(frToEngDictionaryPath, 'utf8'));

    // Add words to dictionaries
    engToFrDictionary[frenchWord] = englishWord;
    frToEngDictionary[englishWord] = frenchWord;

    // Write updated dictionaries back to files
    fs.writeFileSync(engToFrDictionaryPath, JSON.stringify(engToFrDictionary, null, 2));
    fs.writeFileSync(frToEngDictionaryPath, JSON.stringify(frToEngDictionary, null, 2));

    // Send success response
    res.send('Words added successfully to both dictionaries.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
