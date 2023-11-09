export const books = [
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        id: 1,
        author: "J.R.R Tolkein"
    },
    {
        title: "Animal Farm",
        id: 2,
        author: "George Orwell"
    },
    {
        title: "One Fish, Two Fish, Red Fish, Blue Fish",
        id: 3,
        author: "Dr Seuss"
    }
];

export const getBookById = (id) => {
    return books.find(book => book.id === id);
}

export const initialPeople = [
    {
        id: 1,
        name: "Caroline Ciliberti",
        image: "images/caroline.png",
        text: "Mom is the best person around",
        libraryCardId: "4618"
    },
    {
        id: 2,
        name: "Jim Podroskey",
        image: "images/jim.png",
        text: "Dad has a stinky butt",
        libraryCardId: "1565"
    },
    {
        id: 3,
        name: "Lily Dog",
        image: "images/lily.png",
        text: "I'll just go pee in the guest room",
        libraryCardId: "8740"
    },
    {
        id: 4,
        name: "Anna Podroskey",
        image: "images/anna.png",
        text: "Anna is the very best kid",
        libraryCardId: "9383",
        signedIn: true
    }
];

export const bookReferences =  [
    {
        bookId: 1,
        overdue: true,
        perdonId: 4

    },
    {
        bookId: 2,
        perdonId: 4
    }
]

