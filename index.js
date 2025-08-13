const express = require('express');
const app = express();
const Joi = require('joi')
const logger = require('./logger')
const helmet = require('helmet');
const morgan = require("morgan")
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');


app.use(express.json()); // Body parser
app.use(logger);
app.use(morgan("tiny"));
app.use(helmet());

let books = [
    { id: 1, name: "O'tkan kunlar" },
    { id: 2, name: "Kecha va kunduz" },
    { id: 3, name: "Mehrobdan chayon" },
    { id: 4, name: "Alpomish" },
];


// const logFile = path.join(__dirname, 'logs.json');

// // MAC manzilni olish funksiyasi
// function getMacByIp(ip) {
//   try {
//     if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', ''); // IPv4 format
//     const result = execSync(`arp -n ${ip}`).toString();
//     const match = result.match(/(([a-f0-9]{2}:){5}[a-f0-9]{2})/i);
//     return match ? match[0] : null;
//   } catch (err) {
//     return null;
//   }
// }

// // Morgan o‘rniga custom logger (JSON format)
// app.use((req, res, next) => {
//   const start = Date.now();

//   res.on('finish', () => {
//     const ip = req.ip || req.connection.remoteAddress;
//     const mac = getMacByIp(ip) || 'MAC-topilmadi';

//     const logData = {
//       time: new Date().toISOString(),
//       method: req.method,
//       url: req.originalUrl,
//       status: res.statusCode,
//       responseTimeMs: Date.now() - start,
//       ip: ip,
//       mac: mac
//     };

//     // Faylga yozish
//     fs.appendFile(logFile, JSON.stringify(logData) + '\n', (err) => {
//       if (err) console.error('Log yozishda xato:', err);
//     });

//     // Konsolga ham chiqarish
//     console.log(logData);
//   });

//   next();
// });


// Loglar saqlanadigan fayl yo‘lini belgilash
const logStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), // log fayl nomi
  { flags: 'a' } // 'a' → mavjud faylga yozishni davom ettiradi
);

// Morgan middleware — loglarni faylga yozish
app.use(morgan('combined', { stream: logStream }));

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
