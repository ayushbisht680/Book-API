Books-API
<------------------------ DataBase Details -------------------------->

Book

- ISBN          - String
- Title         - String
- Author        - [Numbers]
- Language      - String
- Publications  - Numbers
- NumOfPages    - Numbers
- Categories    - [String]
Author

- Id    - Number
- Name  - String
- Books - [Strings]
Publication

- Id    - Number
- Name  - String
- Books - [Strings]
<--------------------------- APIs ----------------------------->

Book

- GET
    - to get all books
    - to get specific book
    - to get a list of books based on category
    - to get a list of books based on author

- POST
    - to add new books

- PUT
    - update book details
    - to update/add new author

- DELETE
    - delete a book
    - delete an author from the book
Author

- GET
    - to get all authors
    - to get specific author
    - to get list of author based on a book

- POST
    - to add new author

- PUT
    - update author details

- DELETE
    - delete an author
Publication

- GET
    - to get all publication
    - to get specific publication
    - to get a list of publication based on a book.

- POST
    - Add a new publication

- PUT
    - update publication
    - to update/add new book

- DELETE
    - delete a publication
    - delete a book from publication
<--------------------------- APIs Details ----------------------------->

/* ------------------------ GET APIs -------------------------- */

Book

Route    - /book
Des      - to get all books
Access   - Public
Method   - GET
Params   - none
Body     - none

Route    - /book/:BookID
Des      - to get specific book
Access   - Public
Method   - GET
Params   - bookID
Body     - none

Route    - /book/cat/category
Des      - to get a list of books based on category
Access   - Public
Method   - GET
Params   - category
Body     - none

Route    - /book/aut/author
Des      - to get a list of books based on author
Access   - Public
Method   - GET
Params   - author
Body     - none
Author

Route    - /author
Des      - to get all authors
Access   - Public
Method   - GET
Params   - none
Body     - none

Route    - /author/aut/:author_
Des      - to get specific author
Access   - Public
Method   - GET
Params   - author
Body     - none

Route    - /author/book/:book
Des      - to get list of author based on a book
Access   - Public
Method   - GET
Params   - author
Body     - none
Publication

Route    - /publication
Des      - to get all publication
Access   - Public
Method   - GET
Params   - none
Body     - none

Route    - /publication/pub/:pub_
Des      - to get specific publication
Access   - Public
Method   - GET
Params   - publication
Body     - none

Route    - /publication/book/:book_
Des      - to get a list of publication based on a book
Access   - Public
Method   - GET
Params   - book
Body     - none
/* ------------------------ POST APIs -------------------------- */

Book

Route    - /book/new
Des      - to add new books
Access   - Public
Method   - POST
Params   - none
Body     - none
Author

Route    - /author/new
Des      - to add new author
Access   - Public
Method   - POST
Params   - none
Body     - none
Publication

Route    - /publication/new
Des      - to add new publication
Access   - Public
Method   - POST
Params   - none
Body     - none
/* ------------------------ PUT APIs -------------------------- */

Book

Route    - /book/update/:isbn
Des      - update book title
Access   - Public
Method   - PUT
Params   - isbn
Body     - { title: newTtile }

Route    - /book/updateAuthour/:isbn
Des      - to update/add new author
Access   - Public
Method   - PUT
Params   - isbn
Body     - { "newAuthor": id }
Author

Route    - /author/update/:id
Des      - update author details
Access   - Public
Method   - PUT
Params   - id
Body     - { "name": { newName } }
Publication

Route    - /publication/update/:id
Des      - update publication
Access   - Public
Method   - PUT
Params   - id
Body     - { "name": { newName } }

Route    - /publication/updateBook/:id
Des      - to update/add new book
Access   - Public
Method   - PUT
Params   - id
Body     - { "book": ISBN }
/* ------------------------ DELETE APIs -------------------------- */

Book

Route    - /book/deleteBook/:BookID
Des      - to get specific book
Access   - Public
Method   - DELETE
Params   - bookID
Body     - none

Route    - /book/deleteAuthor/:BookID/:authorID
Des      - delete an author from the book
Access   - Public
Method   - DELETE
Params   - bookID, authorID
Body     - none
Author

Route    - /author/delete/:authorID
Des      - delete an author
Access   - Public
Method   - DELETE
Params   - authorID
Body     - none
Publication

Route    - /publication/delete/:publicationId
Des      - delete a publication
Access   - Public
Method   - DELETE
Params   - publicationID
Body     - none

Route    - /publication/deleteBook/:publicationId/:bookId
Des      - delete a book from publication
Access   - Public
Method   - DELETE
Params   - publicationID, bookID
Body     - none