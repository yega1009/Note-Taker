const express = require('express');
const path = require('path');
const fs = require('fs');

const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred reading the database." });
        }
        return res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred reading the database. "});
        }
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).json({ error: "An error occurred writing to the database." });
            }
            return res.json(newNote);
        });
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});