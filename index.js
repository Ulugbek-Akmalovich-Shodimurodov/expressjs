const express = require('express')
const app = express();

app.get('/', (req, res)=>{
    res.send('Salom')
})

app.get('/api/books', (req, res)=>{
    res.send(['qwert', '12345', 'asdfg'])
})

app.listen(5000, ()=>{
    console.log('5000chi portni eshitishni boshladim...');
    
})