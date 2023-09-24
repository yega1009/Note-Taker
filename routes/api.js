const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const router = express.Router();

router.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred reading the database." });
        }
        return res.json(JSON.parse(data));
    });
});

router.post('/api/notes', (req, res) => {
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

module.exports = router;