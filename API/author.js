const Router = require("express").Router();

const BookModel = require("../schema/book");
const AuthorModel = require("../schema/author");
const PublicationModel = require("../schema/publication");

//ROUTE -- /author
// desc --to get all author
// ACCESS -- public
// METHOD -- get
//  PARAMS -- none
// BODY --none

Router.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

//ROUTE -- /author/id
// desc --to get specific author
// ACCESS -- public
// METHOD -- get
// PARAMS -- id
// BODY --none

Router.get("/author/:Id", (req, res) => {
  const { Id } = req.params;
  const bookAuthor = database.Author.filter(
    (author) => author.id === parseInt(Id)
  );
  return res.json({ author: bookAuthor });
});

//ROUTE -- /author/new
// desc --to add a new author
// ACCESS -- public
// METHOD -- post
// PARAMS -- none

Router.post("/author/new", async (req, res) => {
  try {
    const { newAuthor } = req.body;
    await AuthorModel.create(newAuthor);
    return res.json({ message: "Author Added to Database" });
  } catch (error) {
    return res.json({ error: `The Error is ${error}` });
  }
});

//ROUTE -- /author/update/:id
// desc --to update a authors info
// ACCESS -- public
// METHOD -- put
// PARAMS -- id (so we can find the find author)

Router.put("/author/update/:ID", (req, res) => {
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

//ROUTE -- /author/newBook/:id
// desc --to update/add new book
// ACCESS -- public
// METHOD -- put
// PARAMS -- ID (so we can find the find)

Router.put("/author/newBook/:ID", (req, res) => {
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

//ROUTE -- /author/newName/:id
// desc --to update author name in Author
// ACCESS -- public
// METHOD -- put
// PARAMS -- ID (so we can find the find)

Router.put("/author/newName/:ID", (req, res) => {
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

/*
Route                   /author/delete/:id
Description             delte an author 
Access                  PUBLIC
Parameters              id
Method                  DELETE
*/

Router.delete("/author/delete/:ID", async (req, res) => {
  const { ID } = req.params;

  const updatedAuthor = await AuthorModel.findOneAndDelete({
    id: ID,
  });

  res.json({ Author: updatedAuthor });
});

module.exports = Router;
