const express = require('express');
const html = require('.routes/html');
const api = require('.routes/api');

// const path = require('path');
// const fs = require('fs');
// const uuid = require('./helpers/uuid');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(html);
app.use(api);

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/notes.html"));
// });

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});