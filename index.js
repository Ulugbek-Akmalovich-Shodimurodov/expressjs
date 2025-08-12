const express = require('express');
const app = express();
const Joi = require('joi')

app.use(express.json()); // Body parser

app.use(function (req, res, next){
    console.log("log yozish...");
    next();
    
    
})

let books = [
    { id: 1, name: "O'tkan kunlar" },
    { id: 2, name: "Kecha va kunduz" },
    { id: 3, name: "Mehrobdan chayon" },
    { id: 4, name: "Alpomish" },
];

app.get('/', (req, res) => {
    res.send('Salom');
});

app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const findBook = books.find(book => book.id === bookId);

    if (!findBook) {
        return res.status(404).send('Kitob topilmadi');
    }

    res.send(findBook);
});

app.get('/api/books', (req, res) => {
    res.send(books);
});

app.post('/api/books', (req, res) => {

    const bookSchema = Joi.object({
        name: Joi.string().pattern(/^[a-zA-Z0-9\s.,'-]+$/).required().min(3)
    });


    const { error } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const book = {
        id: books.length + 1,
        name: req.body.name
    };

    books.push(book);
    res.status(201).send(book);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
});
