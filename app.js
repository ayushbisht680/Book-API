require('dotenv').config()

const express = require("express");

const mongoose = require("mongoose");

const database = require("./database"); // importing

mongoose
  .connect(process.env.MONODB_URL, {  // Predefined Asynchronously
    useNewUrlParser: true,
    useUnifiedTopology: true, // copy then from mongoose documentation
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect To The Database Successfully"))
  .catch(() => console.log("Cannot Connect To The Database"));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Its was nice experience with express" });
});

//ROUTE -- /book
// desc --to get all books
// ACCESS -- public
// METHOD -- get
//  PARAMS --none
// BODY --none

app.get("/book", (req, res) => {
  return res.json({ books: database.Book });
});

//ROUTE -- /book/bookId (entered by user)
// desc --to get a specific books
// ACCESS -- public
// METHOD -- get
//  PARAMS -- bookId
// BODY --none

app.get("/book/:bookId", (req, res) => {
  const myBook = database.Book.filter((book) => {
    return book.ISBN === req.params.bookId;
  });

  return res.json({ book: myBook });
});

//ROUTE -- /book/c/category (entered by user)
// desc --to get a  book based on category
// ACCESS -- public
// METHOD -- get
// PARAMS -- category
// BODY --none

app.get("/book/c/:category", (req, res) => {
  const myCategory = database.Book.filter((book) => {
    return book.category.includes(req.params.category); // bcz category is an array
  });

  return res.json({ book: myCategory });
});

//ROUTE -- /book/a/author (entered by user)
// desc --to get a book based on author
// ACCESS -- public
// METHOD -- get
// PARAMS -- author
// BODY --none

app.get("/book/a/:ID", (req, res) => {
  const { ID } = req.params;
  const myAuthor = database.Book.filter((book) =>
    book.authors.includes(parseInt(ID))
  );
  return res.json({ book: myAuthor });
});

//ROUTE -- /author
// desc --to get all author
// ACCESS -- public
// METHOD -- get
//  PARAMS -- none
// BODY --none

app.get("/author", (req, res) => {
  return res.json({ books: database.Author });
});

//ROUTE -- /author/id
// desc --to get specific author
// ACCESS -- public
// METHOD -- get
// PARAMS -- id
// BODY --none

app.get("/author/:Id", (req, res) => {
  const { Id } = req.params;
  const bookAuthor = database.Author.filter(
    (author) => author.id === parseInt(Id)
  );
  return res.json({ author: bookAuthor });
});

//ROUTE -- /public
// desc --to get all publications
// ACCESS -- public
// METHOD -- get
// PARAMS -- none
// BODY --none

app.get("/public", (req, res) => {
  return res.json({ public: database.Publication });
});

//ROUTE -- /public/:publicName
// desc --to get specific publications
// ACCESS -- public
// METHOD -- get
// PARAMS -- publication name
// BODY --none

app.get("/public/:publicName", (req, res) => {
  const myPublic = database.Publication.filter((public) => {
    return public.name === req.params.publicName;
  });

  return res.json({ publication: myPublic });
});

//ROUTE -- /public/p/bookId
// desc --to get a list of publication based on a book
// ACCESS -- public
// METHOD -- get
// PARAMS -- publication book Id
// BODY --none

app.get("/public/p/:bookId", (req, res) => {
  const myPublic1 = database.Publication.filter((public) => {
    return public.books.includes(req.params.bookId);
  });

  return res.json({ publication: myPublic1 });
});

// POST REQUESTS

//ROUTE -- /book/new
// desc --to add a new book
// ACCESS -- public
// METHOD -- post
// PARAMS -- none

app.post("/book/new", (req, res) => {
  console.log(req.body);
  res.end("Successfully added till now ");
  // return res.json({message:"book added successfully"});
});

//ROUTE -- /author/new
// desc --to add a new author
// ACCESS -- public
// METHOD -- post
// PARAMS -- none

app.post("/author/new", (req, res) => {
  const { newAuthor } = req.body; // this is destructuring
  database.Author.push(newAuthor);
  return res.json(database.Author);
});

//ROUTE -- /public/new
// desc --to add a new publication
// ACCESS -- public
// METHOD -- post
// PARAMS -- none

app.post("/public/new", (req, res) => {
  const { newPublic } = req.body;
  database.Publication.push(newPublic);
  // no changes in database.js only creating a copy no permanant changes will happen
  res.json(database.Publication);
});

// PUT REQUESTS

//ROUTE -- /book/update/:isbn
// desc --to update a books info
// ACCESS -- public
// METHOD -- put
// PARAMS -- ISBN (so we can find the find book)

app.put("/book/update/:isbn", (req, res) => {
  const { updatedBook } = req.body;
  const { isbn } = req.params;

  const book = database.Book.map((book) => {
    if (book.ISBN === isbn) {
      return { ...book, ...updatedBook };
    }
    return book;
  });

  return res.json(book);
});

//ROUTE -- /book/newAuthor/:isbn
// desc --to update/add new author
// ACCESS -- public
// METHOD -- put
// PARAMS -- ISBN (so we can find the find)

app.put("/book/newAuthor/:isbn", (req, res) => {
  const { newAuthor } = req.body;
  const { isbn } = req.params;

  database.Book.forEach((book) => {
    if (book.ISBN === isbn) {
      // if not present inside the author array then insert otherwise do nothing
      if (!book.authors.includes(newAuthor)) {
        book.authors.push(newAuthor);
        return book;
      }
      return book;
    }
    return book;
  });
  // updation of Author is also needed
  database.Author.forEach((author) => {
    if (author.id === newAuthor) {
      if (!author.books.includes(isbn)) {
        author.books.push(isbn);
        return author;
      }
      return author;
    }
    return author;
  });

  return res.json({ book: database.Book, author: database.Author });
});

//ROUTE -- /author/update/:id
// desc --to update a authors info
// ACCESS -- public
// METHOD -- put
// PARAMS -- id (so we can find the find author)

app.put("/author/update/:ID", (req, res) => {
  const { updatedAuthor } = req.body;
  const { ID } = req.params;

  const authors = database.Author.map((author) => {
    if (author.id === parseInt(ID)) {
      return { ...author, ...updatedAuthor };
    }
    return author;
  });

  return res.json(authors);
});

//ROUTE -- /pubic/update/:id
// desc --to update a authors info
// ACCESS -- public
// METHOD -- put
// PARAMS -- id (so we can find the find author)

app.put("/public/update/:ID", (req, res) => {
  const { updatedPublic } = req.body;
  const { ID } = req.params;

  const publics = database.Publication.map((public) => {
    if (public.id === parseInt(ID)) {
      return { ...public, ...updatedPublic };
    }
    return public;
  });

  res.json(publics);
});

//ROUTE -- /author/newBook/:id
// desc --to update/add new book
// ACCESS -- public
// METHOD -- put
// PARAMS -- ID (so we can find the find)

app.put("/author/newBook/:ID", (req, res) => {
  const { newBook } = req.body;
  const { ID } = req.params;

  database.Author.forEach((author) => {
    if (author.id === parseInt(ID)) {
      if (!author.books.includes(newBook)) {
        author.books.push(newBook);
        return author;
      }
      return author;
    }
    return author;
  });

  res.json({ author: database.Author });
});

//ROUTE -- /public/newBook/:id
// desc --to update/add new book in publication
// ACCESS -- public
// METHOD -- put
// PARAMS -- ID (so we can find the find)

app.put("/public/newBook/:ID", (req, res) => {
  const { newBook } = req.body;
  const { ID } = req.params;

  database.Publication.forEach((public) => {
    if (public.id === parseInt(ID)) {
      if (!public.books.includes(newBook)) {
        public.books.push(newBook);
        return public;
      }
      return public;
    }
    return public;
  });

  res.json({ public: database.Publication });
});

//ROUTE -- /author/newName/:id
// desc --to update author name in Author
// ACCESS -- public
// METHOD -- put
// PARAMS -- ID (so we can find the find)

app.put("/author/newName/:ID", (req, res) => {
  const { newName } = req.body;
  const { ID } = req.params; // it is in string form

  database.Author.forEach((author) => {
    if (author.id === parseInt(ID)) {
      author.name = newName;
      return author;
    }
    return author;
  });

  res.json(database.Author);
});

// DELETE REQUESTS

//ROUTE -- /book/delete/:isbn
// desc --delete a book
// ACCESS -- public
// METHOD -- delete
// PARAMS -- isbn
// BODY -- none(only isbn is needed)

app.delete("/book/delete/:isbn", (req, res) => {
  const { isbn } = req.params;
  const filteredBooks = database.Book.filter((book) => {
    return book.ISBN != isbn;
  });

  database.Book = filteredBooks;
  res.json(database.Book);
});

/*
Route                   /book/delete/author/:isbn/:id
Description             delte an author from a book
Access                  PUBLIC
Parameters              isbn,id
Method                  DELETE
*/
app.delete("/book/delete/author/:isbn/:id", (req, res) => {
  const { isbn, id } = req.params;

  database.Book.forEach((book) => {
    if (book.ISBN === isbn) {
      if (!book.authors.includes(parseInt(id))) {
        return;
      }

      book.authors = book.authors.filter(
        (databaseId) => databaseId !== parseInt(id)
      );
      return book;
    }
    return book;
  });

  database.Author.forEach((author) => {
    if (author.id === parseInt(id)) {
      if (!author.books.includes(isbn)) {
        return;
      }
      // if it includes the id then it should be removed as well
      author.books = author.books.filter((book) => book !== isbn);

      return author;
    }
    return author;
  });

  return res.json({ book: database.Book, author: database.Author });
});

/*
Route                   /author/delete/:id
Description             delte an author 
Access                  PUBLIC
Parameters              id
Method                  DELETE
*/

app.delete("/author/delete/:ID", (req, res) => {
  const { ID } = req.params;

  const filteredAuthors = database.Author.filter((author) => {
    return author.id != parseInt(ID);
  });
  database.Author = filteredAuthors;
  return res.json(database.Author);
});

/*
Route                   /public/delete/:id
Description             delte a publication 
Access                  PUBLIC
Parameters              id
Method                  DELETE
*/

app.delete("/public/delete/:ID", (req, res) => {
  const { ID } = req.params;

  const filteredPub = database.Publication.filter((pubic) => {
    return pubic.id != parseInt(ID);
  });
  database.Publication = filteredPub;
  return res.json(database.Publication);
});

/*
Route                   /public/delete/book/:isbn/:id
Description             delte a book from publication 
Access                  PUBLIC
Parameters              isbn ,id
Method                  DELETE
*/

app.delete("/public/delete/book/:isbn/:id", (req, res) => {
  const { isbn, id } = req.params;

  database.Book.forEach((book) => {
    if (book.ISBN === isbn) {
      book.publication = 0; // overriding
      return book;
    }
    return book;
  });

  database.Publication.forEach((publication) => {
    if (publication.id === parseInt(id)) {
      const filteredBooks = publication.books.filter((book) => book !== isbn);
      publication.books = filteredBooks;
      return publication;
    }
    return publication;
  });

  return res.json({ book: database.Book, publication: database.Publication });
});

// Listening in port
app.listen(80, () => {
  console.log("Server is running");
});
