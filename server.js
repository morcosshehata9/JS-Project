const express = require('express');
const fs = require('fs');
const app = express();

// Enable CORS (for frontend access)
const cors = require('cors');
app.use(cors());

// Load menu data
const menu = JSON.parse(fs.readFileSync('./menu.json', 'utf-8'));

// API endpoint to get all menu items
app.get('/menu', (req, res) => {
    res.json(menu);
});

// API endpoint to get a specific item by ID
app.get('/menu/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = menu.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});
app.use('/images', express.static('images'));


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('API is running on http://localhost:3000');
});
