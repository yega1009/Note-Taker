const express = require('express');
const api = require('./routes/api');  
const html = require('./routes/html');  

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(api);
app.use(html);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
