const Router = require("express").Router();

const BookModel = require("../schema/book");
const AuthorModel = require("../schema/author");
// const PublicationModel = require("../schema/publication");

//ROUTE -- /book
// desc --to get all books
// ACCESS -- public
// METHOD -- get
//  PARAMS --none
// BODY --none

Router.get("/book", async (req, res) => {
  const getAllBooks = await BookModel.find(); // will wait for this line of code to execute
  return res.json(getAllBooks);
});

//ROUTE -- /book/bookId (entered by user)
// desc --to get a specific books
// ACCESS -- public
// METHOD -- get
//  PARAMS -- bookId
// BODY --none

Router.get("/book/:bookId", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.bookId });

  if (!getSpecificBook) {
    return res.json({ error: `No book found for if ${req.params.bookId}` });
  }

  return res.json(getSpecificBook);
});

//ROUTE -- /book/c/category (entered by user)
// desc --to get a  book based on category
// ACCESS -- public
// METHOD -- get
// PARAMS -- category
// BODY --none

Router.get("/book/c/:category", async (req, res) => {
  const getByCategory = await BookModel.find({ category: req.params.category });
  // monogoDB automatically iterates inside the arrays as well
  if (!getByCategory) {
    return res.json({ error: `no category found of ${req.params.category}` });
  }

  return res.json({ books: getByCategory });
});

//ROUTE -- /book/a/author (entered by user)
// desc --to get a book based on author
// ACCESS -- public
// METHOD -- get
// PARAMS -- author
// BODY --none

Router.get("/book/a/:ID", (req, res) => {
  const { ID } = req.params;
  const myAuthor = database.Book.filter((book) =>
    book.authors.includes(parseInt(ID))
  );
  return res.json({ book: myAuthor });
});

//ROUTE -- /book/new
// desc --to add a new book
// ACCESS -- public
// METHOD -- post
// PARAMS -- none

Router.post("/book/new", async (req, res) => {
  try {
    const { newBook } = req.body;
    await BookModel.create(newBook);
    return res.json({ message: "Book Added to Database" });
  } catch (error) {
    return res.json({ error: error });
  }
});

//ROUTE -- /book/update/:isbn
// desc --to update a books title or anyfield
// ACCESS -- public
// METHOD -- put
// PARAMS -- ISBN (so we can find the find book)

Router.put("/book/update/:isbn", async (req, res) => {
  const { myBook } = req.body;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      // first find
      ISBN: req.params.isbn,
    },
    {
      // update
      title: myBook.title,
    },
    {
      // for reflecting the change in res json
      new: true,
    }
  );

  res.json({ book: updatedBook });
});

//ROUTE -- /book/newAuthor/:isbn
// desc --to update/add new author
// ACCESS -- public
// METHOD -- put
// PARAMS -- ISBN (so we can find the find)

Router.put("/book/newAuthor/:isbn", async (req, res) => {
  const { newAuthor } = req.body;
  const { isbn } = req.params;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: isbn,
    },
    {
      $addToSet: {
        // will add only if its not present
        authors: newAuthor,
      },
    },
    {
      new: true,
    }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: newAuthor,
    },
    {
      $addToSet: {
        books: isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: `Added to the database successfylly`,
  });
});

//ROUTE -- /book/delete/:isbn
// desc --delete a book
// ACCESS -- public
// METHOD -- delete
// PARAMS -- isbn
// BODY -- none(only isbn is needed)

Router.delete("/book/delete/:isbn", async (req, res) => {
  const { isbn } = req.params;

  const updatedBook = await BookModel.findOneAndDelete({
    ISBN: isbn,
  });

  res.json({ books: updatedBook });
});

/*
Route                   /book/delete/author/:isbn/:id
Description             delte an author from a book
Access                  PUBLIC
Parameters              isbn,id
Method                  DELETE
*/
Router.delete("/book/delete/author/:Isbn/:Id", async (req, res) => {
  const { Isbn, Id } = req.params;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: Isbn,
    },
    {
      $pull: {
        authors: parseInt(Id),
      },
    },
    {
      new: true,
    }
  );

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(Id),
    },
    {
      $pull: {
        books: Isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: "Delete was successful",
  });
});

module.exports = Router;
