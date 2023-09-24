const express = require('express');
const html = require('.routes/html');
const api = require('.routes/api');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(html);
app.use(api);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});