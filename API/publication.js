const Router = require("express").Router();
const BookModel = require("../schema/book");
const PublicationModel = require("../schema/publication");


/* ------------------------ GET APIs -------------------------- */


// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

Router.get("/", async (req, res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication);
});

// Route    - /publication/pub/:pub_
// Des      - to get specific publication
// Access   - Public
// Method   - GET
// Params   - publication
// Body     - none

Router.get("/pub/:pub_", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({id: parseInt(req.params.pub_)});

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id of ${parseInt(req.params.pub_)}`
    });
    }

    return res.json(getSpecificPublication);
});

// Route    - /publication/book/:book_
// Des      - to get a list of publication based on a book
// Access   - Public
// Method   - GET
// Params   - book
// Body     - none

Router.get("/book/:book_", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.book_});

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the book ${req.params.book_}`
    });
    }

    return res.json(getSpecificPublication);
});


/* ------------------------ POST APIs -------------------------- */

// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newPublication: { details } }

Router.post("/new", (req, res) => {
    try {
        const { newPublication } = req.body;

        PublicationModel.create(newPublication);
        return res.json({ message: "Publication added to the database" });
    }
    catch(error) {
        return res.json({ error: error.message });
    }
});


/* ------------------------ PUT APIs -------------------------- */

// Route    - /publication/update/:id
// Des      - update publication
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "name": { newName } }

Router.put("/update/:id", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.name },
        { new: true }
    );

    return res.json(updatedPublication);
});

// Route    - /publication/updateBook/:id
// Des      - to update/add new book
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "book": ISBN }

Router.put("/updateBook/:id", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { $addToSet: { books: req.body.book } },
        { new: true }
    );
    
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: req.body.book },
        { publication: parseInt(req.params.id) },
        { new: true }
    );

    return res.json({ publication: updatedPublication, book: updatedBook });
});


/* ------------------------ DELETE APIs -------------------------- */

// Route    - /publication/delete/:publicationId
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID
// Body     - none

Router.delete("/delete/:publicationId", async (req, res) => {
    const updatedPublication = await PublicationModel.findOneAndDelete( 
        { id: parseInt(req.params.publicationId) }
    );

    return res.json({ publications: updatedPublication });
});

// Route    - /publication/deleteBook/:publicationId/:bookId
// Des      - delete a book from publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID, bookID
// Body     - none

Router.delete("/deleteBook/:publicationId/:bookId", async (req, res) => {
    const id = parseInt(request.params.publicationId);
    const isbn = request.params.bookId;

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: id },
        { $pull: { books: isbn } },
        { new: true }
    );

    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: isbn },
        { publication: -1 },
        { new: true }
    );

    res.json({ publication: updatedPublication, book: updatedBook })
});

module.exports = Router;