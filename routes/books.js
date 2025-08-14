const express = require('express');
const router = express.Router();
const Joi = require('joi')

let books = [
    { id: 1, name: "O'tkan kunlar" },
    { id: 2, name: "Kecha va kunduz" },
    { id: 3, name: "Mehrobdan chayon" },
    { id: 4, name: "Alpomish" },
];

router.get('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const findBook = books.find(book => book.id === bookId);

    if (!findBook) {
        return res.status(404).send('Kitob topilmadi');
    }

    res.send(findBook);
});

router.get('/', (req, res) => {
    res.send(books);
});

router.post('/', (req, res) => {

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

module.exports = router;