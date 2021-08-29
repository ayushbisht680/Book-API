const Router = require("express").Router();
const BookModel = require("../schema/book");
const AuthorModel = require("../schema/author");

/* ------------------------ GET APIs -------------------------- */

// Route    - /book
// Des      - to get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

Router.get("/", async (req, response) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

// Route    - /book/:BookID
// Des      - to get specific book
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none

Router.get("/:bookID", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    ISBN: req.params.bookID,
  });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.bookID}`,
    });
  }

  return res.json(getSpecificBook);
});

// Route    - /book/cat/:category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none

Router.get("/cat/:category", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json(getSpecificBook);
});

// Route    - /book/aut/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

Router.get("/aut/:author", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    authors: parseInt(req.params.author),
  });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the author of ${parseInt(
        req.params.author
      )}`,
    });
  }

  return response.json(getSpecificBook);
});

/* ------------------------ POST APIs -------------------------- */

// Route    - /book/new
// Des      - to add new books
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newBook : { details } }

Router.post("/new", (req, response) => {
  try {
    const { newBook } = req.body;

    BookModel.create(newBook);
    return response.json({ message: "Book added to the database" });
  } catch (error) {
    return response.json({ error: error.message });
  }
});

/* ------------------------ PUT APIs -------------------------- */

// Route    - /book/update/:isbn
// Des      - update book title
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { title: newTtile }

Router.put("/update/:isbn", async (req, response) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    { title: req.body.title },
    { new: true }
  );

  return response.json(updatedBook);
});

// Route    - /book/updateAuthour/:isbn
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { "newAuthor": id }

Router.put("/updateAuthour/:isbn", async (req, response) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    { $addToSet: { authors: req.body.newAuthor } },
    { new: true }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    { id: req.body.newAuthor },
    { $addToSet: { books: req.params.isbn } },
    { new: true }
  );

  return response.json({ book: updatedBook, author: updatedAuthor });
});

/* ------------------------ DELETE APIs -------------------------- */

// Route    - /book/deleteBook/:BookID
// Des      - to get specific book
// Access   - Public
// Method   - DELETE
// Params   - bookID
// Body     - none

Router.delete("/deleteBook/:BookID", async (req, response) => {
  const updatedBook = await BookModel.findOneAndDelete({
    ISBN: req.params.BookID,
  });

  return response.json({ books: updatedBook });
});

// Route    - /book/deleteAuthor/:BookID/:authorID
// Des      - delete an author from the book
// Access   - Public
// Method   - DELETE
// Params   - bookID, authorID
// Body     - none

Router.delete("/deleteAuthor/:BookID/:authorID", async (req, response) => {
  const isbn = req.params.BookID;
  const author_ = parseInt(req.params.authorID);

  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: isbn },
    { $pull: { authors: author_ } },
    { new: true }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    { id: author_ },
    { $pull: { books: isbn } },
    { new: true }
  );

  return response.json({ book: updatedBook, author: updatedAuthor });
});

module.exports = Router;
