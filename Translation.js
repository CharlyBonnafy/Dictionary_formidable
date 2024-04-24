// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to load dictionary from JSON file
function loadDictionary(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8'); // Ensure encoding is set to handle text properly
        const dictionary = JSON.parse(data);
        console.log(`Dictionary from '${filename}' loaded successfully. Sample entry: ${Object.keys(dictionary)[0]}: ${dictionary[Object.keys(dictionary)[0]]}`);
        return dictionary;
    } catch (error) {
        console.error(`Error loading dictionary from file ${filename}:`, error);
        return {};
    }
}

// Load English to French dictionary
const engToFraDictionary = loadDictionary('Complete_dictionary_engtofr.json');

// Load French to English dictionary
const fraToEngDictionary = loadDictionary('Cleaned_dictionary_frtoeng.json');

// Function to test dictionary access
function testDictionaryAccess() {
    const testWordsEng = ['dog', 'cat']; // Examples in English
    const testWordsFra = [' chien', 'chat']; // Corresponding French translations
   

    console.log('Testing English to French dictionary access...');
    testWordsEng.forEach(word => {
        console.log(`Test '${word}': ${engToFraDictionary[word.toLowerCase()] || 'not found'}`);
    });

    console.log('Testing French to English dictionary access...');
    testWordsFra.forEach(word => {
        console.log(`Test '${word}': ${fraToEngDictionary[word.toLowerCase()] || 'not found'}`);
    });
}

// Call this function to check dictionary access
testDictionaryAccess();


app.post('/translate', (req, res) => {
    const { word, direction } = req.body;

    console.log(`Requested translation for: '${word}' in direction: '${direction}'`);

    let dictionary = direction === 'engToFra' ? engToFraDictionary : fraToEngDictionary;
    let normalizedWord = word.trim().toLowerCase();

    let translation = dictionary[normalizedWord];

    if (translation) {
        res.json({ translatedText: translation });
    } else {
        console.log(`Translation not found for: '${word}'`);
        res.json({ translatedText: 'Translation not found' });
    }
});

// Endpoint to get the English to French dictionary
app.get('/eng-to-fra-dictionary', (req, res) => {
    res.json(engToFraDictionary);
});

// Endpoint to get the French to English dictionary
app.get('/fra-to-eng-dictionary', (req, res) => {
    res.json(fraToEngDictionary);
});

// Define port number
const PORT = process.env.PORT || 6500;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
