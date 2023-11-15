import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initialBooks, initialPeople, initialBookReferences, getBookReferencesForPerson } from "./DataManager";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import { PersonSearch } from "./PersonSearch";
import { ShowAllMembers } from "./ShowAllMembers";
import BarcodeScanner from "./BarcodeScanner";
import { PersonDisplay } from "./PersonDisplay";



function PassportVerification({ person }) {
    return <>This is the form</>;
}

const fuzzySearch = (array, key, value) => {
    return array.filter((obj) => {
        const target = obj[key].toLowerCase();
        return target.includes(value.toLowerCase());
    });
};


function App() {
    const [people, setPeople] = useState(initialPeople);
    const [person, setPerson] = useState();
    const [bookReferences, setBookReferences] = useState(initialBookReferences);

    const [books, setBooks] = useState(initialBooks);

    const dataFunctions =
    {
        getPersonById: (id) => {
            return people.find(book => book.id === id);
        },


        signInPerson: (personSigningIn, newSignInStatus = true) => {
            setPeople(prevPeople => 
                prevPeople.map(person => 
                  person.id === personSigningIn.Id ? { ...person, signedIn: newSignInStatus } : person
                )
              );
            personSigningIn.signedIn = newSignInStatus;
            setPerson(personSigningIn);
        },

        verifyIdNumber: (personId, idNumber) =>
        {
            const person = dataFunctions.getPersonById(personId);
            if (person && person.libraryCardId === idNumber) {
                console.log("Verified ID number");
                return true;
            }

            console.log("Did not verify ID number");
            return false;
        },

        //Not using this one any more since I changed it so the book
        //new who had it checked out.
        removeBookReference: (bookReferences, personId, bookId) => {
            setBookReferences(prevBookReferences => {
                return prevBookReferences.filter(
                    reference => !(reference.personId === personId && reference.bookId === bookId)
                );
            })
        },

        removeBook: (bookId) => {
            setBooks(prevBooks => {
                return prevBooks.map(book => {
                    if (book.id === bookId) {
                        return { ...book, checkedOutByPersonId: null };
                    }
                    return book;
                    // Return the book unchanged if it's not the one to update
                });
            })
        },


        addBookReference: (personId, bookId) => {
            const updatedBookReferences = [...bookReferences, { bookId: bookId, personId: personId }];
            setBookReferences(updatedBookReferences);
        },

        addBook: (book, personId) => {
            console.log(book, personId);
            setBooks(prevBooks => {
                return prevBooks.map(currentBook => {
                    if (currentBook.id === book.id) {
                        console.log("inner");
                        return { ...currentBook, checkedOutByPersonId: personId };
                    }
                    console.log('missed');
                    return currentBook;
                    // Return the book unchanged if it's not the one to update
                });
            })

        }
    }



    useEffect(() => {
        initializeLocalStorage();
        //    retrieveData();
    }, []);

    const initializeLocalStorage = () => {
        const storedData = JSON.parse(localStorage.getItem('books'));

        // If no data is stored, initialize with default data
        if (!storedData) {
            localStorage.setItem('books', JSON.stringify(books));
        }
    };


    function findPerson(searchValue) {
        setPerson(null);
        if (searchValue.length) {
            const foundPerson = fuzzySearch(people, "name", searchValue);
            if (foundPerson.length) {
                setPerson(foundPerson[0]);
            }
        }
    }


    return (

        <>
            <Container className="p-3">
                {/* <BarcodeScanner /> */}
                <Row>
                    <Col>
                        <h1 className="header">Welcome to the Library!</h1>
                    </Col>
                    <Col>
                        <ShowAllMembers members={people} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <PersonSearch onSubmit={findPerson} />
                    </Col>
                    <Col>
                        <PersonDisplay person={person} books={books} dataFunctions={dataFunctions} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
