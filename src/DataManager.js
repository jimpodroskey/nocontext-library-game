export const initialBooks = [
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    id: 1,
    author: "J.R.R Tolkein",
    checkedOutByPersonId: 2
  },
  {
    title: "Animal Farm",
    id: 2,
    author: "George Orwell",

  },
  {
    title: "One Fish, Two Fish, Red Fish, Blue Fish",
    id: 3,
    author: "Dr Seuss",
  },
  {
    title: "The Nevergirls 1: In a Blink",
    id: 4,
    author: "Kiki Thorpe",
    checkedOutByPersonId: 4

  },
  {
    title: "The Nevergirls 2: The Space Between",
    id: 5,
    author: "Kiki Thorpe",
  },
  {
    title: "The Nevergirls 3: A Dandelion Wish",
    id: 6,
    author: "Kiki Thorpe",
    checkedOutByPersonId: 4
  },
  {
    id: 7,
    title: "Matilda",
    author: "Roald Dahl"
  },
  {
    id: 8,
    title: "The Magic Tree House series",
    author: "Mary Pope Osborne"
  },
  {
    id: 9,
    title: "Ella Enchanted",
    author: "Gail Carson Levine"
  },
  {
    id: 10,
    title: "Junie B. Jones series",
    author: "Barbara Park"
  },
  {
    id: 11,
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett"
  },
  {
    id: 12,
    title: "Nancy Drew and the Clue Crew series",
    author: "Carolyn Keene"
  },
  {
    id: 13,
    title: "Ramona Quimby, Age 8",
    author: "Beverly Cleary"
  },
  {
    id: 14,
    title: "Pippi Longstocking",
    author: "Astrid Lindgren"
  },
  {
    id: 15,
    title: "The Boxcar Children series",
    author: "Gertrude Chandler Warner"
  },
  {
    id: 16,
    title: "Charlotte's Web",
    author: "E.B. White"
  },
  {
    id: 17,
    title: "Anne of Green Gables",
    author: "L.M. Montgomery"
  },
  {
    id: 18,
    title: "A Series of Unfortunate Events",
    author: "Lemony Snicket"
  },
  {
    id: 19,
    title: "Little House on the Prairie series",
    author: "Laura Ingalls Wilder"
  },
  {
    id: 20,
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll"
  },
  {
    id: 21,
    title: "Where the Red Fern Grows",
    author: "Wilson Rawls"
  },
  {
    id: 22,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling"
  },
  {
    id: 23,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    id: 24,
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling"
  },
  {
    id: 25,
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling"
  },
  {
    id: 26,
    title: "Harry Potter and the Order of the Phoenix",
    author: "J.K. Rowling"
  },
  {
    id: 27,
    title: "Harry Potter and the Half-Blood Prince",
    author: "J.K. Rowling"
  },
  {
    id: 28,
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling"
  }
];

// export const getBookById = (id) => {
//   return books.find((book) => book.id === id);
// };

export const getBooksForPerson = (id, books) => {
  return books.filter((reference) => reference.personId === id);
};


export const initialPeople = [
  {
    id: 1,
    name: "Caroline Ciliberti",
    image: "images/caroline.png",
    text: "Mom is the best person around",
    libraryCardId: "4618",
    signedIn: true,
  },
  {
    id: 2,
    name: "Jim Podroskey",
    image: "images/jim.png",
    text: "Dad has a stinky butt",
    libraryCardId: "1565",
    signedIn: true,
  },
  {
    id: 3,
    name: "Lily Dog",
    image: "images/lily.png",
    text: "I'll just go pee in the guest room",
    libraryCardId: "8740",
    signedIn: true,
  },
  {
    id: 4,
    name: "Anna Podroskey",
    image: "images/anna.png",
    text: "Anna is the very best kid",
    libraryCardId: "7787",
    signedIn: true,
  },
];

export const initialBookReferences = [
  {
    bookId: 1,
    personId: 4,
    overdue: true,
  },
  {
    bookId: 2,
    personId: 4,
  },
  {
    bookId: 5,
    personId: 2,
  },
  {
    bookId: 3,
    personId: 2,
  },
];
