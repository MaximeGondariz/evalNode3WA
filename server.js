const express = require('express')
const soap = require('soap');
const { writeData, readData } = require('./utils/files');
const books = readData()


const app = express();
app.use(express.json());

app.get('/books', (req, res) => {
    res.send(books)
});

app.get('/books/:id', (req, res) => {
    try{
        const {id} = req.params

        const book = books.find((book) => {
            return book.id === +id;
        });

        if(book){
            res.send(book)
        }else{
            res.send('NO BOOK FOUND')
        }
        
    }
    catch(error){
        res.send('ERROR 404')
    }
});

app.post('/books', (req, res) => {
    try{
        const book = { id: books[books.length-1].id + 1, ...req.body };

        if(book.title && book.author && book.nationality){
            books.push(book);

            //writeData(books);

            res.status(201).send({ ok: true, data: book });
            
        }else{
            res.status(500).send({ ok: false, data: '500 BAD REQUEST' });
        }
    }
    catch(error){
        res.status(404).send({ ok: false, data: 'ERROR 404'+error });
    }
    
});

app.put('/books/:id', (req, res) => {
    try{
        const { id } = req.params;

        const book = books.find((book) => {return book.id === +id;});

        if(book){
            if(req.body['title'] && req.body['author'] && req.body['nationality']){
                for ( let key in req.body){
                    book[key] = req.body[key];
                }
    
                const idx = books.findIndex((book) => book.id === +id);
    
                //books.splice(idx, 1, book);
                
                res.status(201).send({ ok: true, data: book });
            }else{
                req.status(500).send({ ok: false, data: '500 BAD REQUEST' });
            }
        }else{
            res.status(501).send({ ok: false, data: '501 INVALID ID PROVIDED' });
        }
    }
    catch(error){
        res.status(404).send({ ok: false, data: 'ERROR 404' });
    }
});

app.delete('/books/:id', (req, res) => {
    try{
        const { id } = req.params;

        const book = books.find((book) => {return book.id === +id;});

        if(book){
            const idx = books.findIndex((book) => book.id === +id);

            books.splice(idx, 1);

            //writeData(books);

            res.status(201).send({ok: true, data: books})
        }else{
            res.status(501).send({ ok: false, data: '501 INVALID ID PROVIDED' });
        }
    }
    catch(error){
        res.status(404).send({ ok: false, data: 'ERROR 404' });
    }
});

app.listen(4200, () => console.log('Port 4200'));