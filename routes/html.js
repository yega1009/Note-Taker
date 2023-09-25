// Import required modules
const express = require('express');
const path = require('path');

// Initialize router
const router = express.Router();

// Define route to serve 'notes.html' file
router.get("/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// A route that serves the 'index.html' file for any routes that are not matched
router.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export router to be used in the main server file
module.exports = router;
