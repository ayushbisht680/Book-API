// Temporary Database

let Book = [
  //array of objects books
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: 1,
  },
  {
    ISBN: "12345Two",
    title: "Getting started with Python",
    authors: [1],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "tech", "web dev"],
    publication: 1,
  },
];

let Author = [
  //array of objects author
  {
    id: 1,
    name: "pavan",
    books: ["12345ONE", "12345Two"],
  },
  {
    id: 2,
    name: "Ayush",
    books: ["12345ONE"],
  },
];

let Publication = [
  //array of objects publications
  {
    id: 1,
    name: "Chakra",
    books: ["12345ONE"],
  },
  {
    id: 2,
    name: "Piyush Publications",
    books: ["12345Two"],
  },
];

module.exports = { Book, Author, Publication }; // exporting as an object
