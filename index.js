const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('Salom')
})

app.get('/api/books', (req, res) => {
    res.send(['qwert', '12345', 'asdfg', 'adhudcxmas'])
})

app.get('/api/books', (req, res) => {
    res.send(['qwert', '12345', 'asdfg', 'adhudcxmas'])
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
})
