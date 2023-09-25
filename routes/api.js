// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('../helpers/uuid');

// Initialize router
const router = express.Router();

// Define GET route to retrieve notes from database
router.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred reading the database." });
        }
        return res.json(JSON.parse(data));
    });
});

// Define POST route to add a new note to database
router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid();

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred reading the database. " });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
            if (err) {
                return res.status(500).json({ error: "An error occurred writing to the database." });
            }
            return res.json(newNote);
        });
    });
});

// Define DELETE route to remove a note from database based on its ID
router.delete('/api/notes/:id', (req, res) => {
    const noteIdToDelete = req.params.id;

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred reading the database." });
        }

        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== noteIdToDelete);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedNotes), (err) => {
            if (err) {
                return res.status(500).json({ error: "An error occurred reading the database." });
            }
            return res.json({ messagre: "Note deleted!" });
        });
    });
});

// Export router to be used in main server file
module.exports = router;
