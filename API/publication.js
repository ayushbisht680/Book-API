const Router = require("express").Router();

const BookModel = require("../schema/book");
const AuthorModel = require("../schema/author");
const PublicationModel = require("../schema/publication");

//ROUTE -- /public
// desc --to get all publications
// ACCESS -- public
// METHOD -- get
// PARAMS -- none
// BODY --none

Router.get("/public", (req, res) => {
  return res.json({ public: database.Publication });
});

//ROUTE -- /public/:publicName
// desc --to get specific publications
// ACCESS -- public
// METHOD -- get
// PARAMS -- publication name
// BODY --none

Router.get("/public/:publicName", (req, res) => {
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

Router.get("/public/p/:bookId", (req, res) => {
  const myPublic1 = database.Publication.filter((public) => {
    return public.books.includes(req.params.bookId);
  });

  return res.json({ publication: myPublic1 });
});

//ROUTE -- /public/new
// desc --to add a new publication
// ACCESS -- public
// METHOD -- post
// PARAMS -- none

Router.post("/public/new", (req, res) => {
  const { newPublic } = req.body;
  database.Publication.push(newPublic);
  // no changes in database.js only creating a copy no permanant changes will happen
  res.json(database.Publication);
});

//ROUTE -- /pubic/update/:id
// desc --to update a publication info
// ACCESS -- public
// METHOD -- put
// PARAMS -- id (so we can find the find author)

Router.put("/public/update/:ID", (req, res) => {
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

//ROUTE -- /public/newBook/:id
// desc --to update/add new book in publication
// ACCESS -- public
// METHOD -- put
// PARAMS -- ID (so we can find the find)

Router.put("/public/newBook/:ID", (req, res) => {
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

/*
  Route                   /public/delete/:id
  Description             delte a publication 
  Access                  PUBLIC
  Parameters              id
  Method                  DELETE
  */

Router.delete("/public/delete/:ID", async (req, res) => {
  const { ID } = req.params;

  const updatedPublic = await PublicationModel.findOneAndDelete({
    id: ID,
  });

  res.json({ Publication: updatedPublic });
});

/*
  Route                   /public/delete/book/:isbn/:id
  Description             delte a book from publication 
  Access                  PUBLIC
  Parameters              isbn ,id
  Method                  DELETE
  */

Router.delete("/public/delete/book/:isbn/:id", (req, res) => {
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

module.exports = Router;
