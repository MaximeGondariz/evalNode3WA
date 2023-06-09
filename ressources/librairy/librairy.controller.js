import { writeData, readData } from "../../utils/files.js";

export function getBooks(req, res) {
  try {
    const books = readData();
    res.send(books);
  } catch (error) {
    res.send("ERROR 404");
  }
}
export function getOneBook(req, res) {
  try {
    const books = readData();

    const { id } = req.params;

    const book = books.find((book) => {
      return book.id === +id;
    });

    if (book) {
      res.send(book);
    } else {
      res.send("INVALID ID, NO BOOK FOUND");
    }
  } catch (error) {
    res.send("ERROR 404");
  }
}
export function addOneBook(req, res) {
  try {
    const books = readData();

    const book = { id: books[books.length - 1].id + 1, ...req.body };

    books.push(book);

    //writeData(books);

    res.status(201).send({ ok: true, data: book });
  } catch (error) {
    res.status(404).send({ ok: false, data: "ERROR 404" + error });
  }
}
export function updateOneBook(req, res) {
  try {
    const books = readData();

    const { id } = req.params;

    const book = books.find((book) => {
      return book.id === +id;
    });

    if (book) {
      for (let key in req.body) {
        book[key] = req.body[key];
      }

      const idx = books.findIndex((book) => book.id === +id);

      //books.splice(idx, 1, book);

      res.status(201).send({ ok: true, data: book });
    } else {
      res.status(501).send({ ok: false, data: "501 INVALID ID PROVIDED" });
    }
  } catch (error) {
    res.status(404).send({ ok: false, data: "ERROR 404" });
  }
}
export function deleteOneBook(req, res) {
  try {
    const books = readData();

    const { id } = req.params;

    const book = books.find((book) => {
      return book.id === +id;
    });

    if (book) {
      const idx = books.findIndex((book) => book.id === +id);

      books.splice(idx, 1);

      //writeData(books);

      res.status(201).send({ ok: true, data: books });
    } else {
      res.status(501).send({ ok: false, data: "501 INVALID ID PROVIDED" });
    }
  } catch (error) {
    res.status(404).send({ ok: false, data: "ERROR 404" });
  }
}
