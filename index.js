const express = require('express');
const app = express();
const logger = require('./logger')
const helmet = require('helmet');
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require("config")
const books = require('./routes/books');


app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(morgan("tiny"));
app.use(helmet());
app.set('view engine', 'pug')
app.use('/api/books', books);

console.log(config.get('name'));
console.log(config.get('mailserver.host'));
console.log(config.get('mailserver.password'));

// Loglar saqlanadigan fayl yo‘lini belgilash
const logStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), // log fayl nomi
  { flags: 'a' } // 'a' → mavjud faylga yozishni davom ettiradi
);

// Morgan middleware — loglarni faylga yozish
app.use(morgan('combined', { stream: logStream }));

app.get('/', (req, res) => {
    res.render('index', {title: 'my express app', greeting: 'Assalomu alaykum'});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
});
