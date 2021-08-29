const Router = require("express").Router();
const AuthorModel = require("../schema/author");


/* ------------------------ GET APIs -------------------------- */


// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// Route    - /author/aut/:author_
// Des      - to get specific author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

Router.get("/aut/:author_", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({id: parseInt(req.params.author_)});

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found for the id of ${parseInt(req.params.author_)}`
    });
    }

    return res.json(getSpecificAuthor);
});

// Route    - /author/book/:book
// Des      - to get list of author based on a book
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

Router.get("/book/:book", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.book});

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found for the book ${req.params.book}`
    });
    }

    return res.json(getSpecificAuthor);
});


/* ------------------------ POST APIs -------------------------- */

// Route    - /author/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newAuthor: { details } }

Router.post("/new", (req, res) => {
    try {
        const { newAuthor } = req.body;

        AuthorModel.create(newAuthor);
        return res.json({ message: "Author added to the database" });
    }
    catch(error) {
        return res.json({ error: error.message });
    }
});


/* ------------------------ PUT APIs -------------------------- */

// Route    - /author/update/:id
// Des      - update author details
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "name": { newName } }

Router.put("/update/:id", async (req, res) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.name },
        { new: true }
    );

    return res.json(updatedAuthor);
});


/* ------------------------ DELETE APIs -------------------------- */

// Route    - /author/delete/:authorID
// Des      - delete an author
// Access   - Public
// Method   - DELETE
// Params   - authorID
// Body     - none

Router.delete("/delete/:authorID", async (req, res) => {
    const updatedAuthor = await AuthorModel.findOneAndDelete( 
        { id: parseInt(req.params.authorID) }
    );

    return res.json({ authros: updatedAuthor });
});

module.exports = Router;