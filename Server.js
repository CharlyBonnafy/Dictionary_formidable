console.log("Starting server...");
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3500;

// This is your database "file"
const dbPath = path.join(__dirname, 'base_verbes.json');

// Endpoint to get all data from the JSON "database"
app.get('/data', (req, res) => {
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to add a new verb
app.post('/add-verb', (req, res) => {
    const { verb } = req.body;
    if (!verb || !verb.infinitive || !verb.core || !verb.group || !verb.auxiliary) {
        res.status(400).send('Verb data is required and must include "infinitive", "core", "group", and "auxiliary".');
        return;
    }

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file.');
            return;
        }

        const database = JSON.parse(data);
        
        if (!database.verbs) {
            database.verbs = {};
        }

        database.verbs[verb.infinitive] = {
            infinitive: verb.infinitive,
            core: verb.core,
            group: verb.group,
            auxiliary: verb.auxiliary
        };

        fs.writeFile(dbPath, JSON.stringify(database, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to database file.');
                return;
            }
            res.send('Verb added successfully.');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
