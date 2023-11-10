import React, { useState, useEffect, useContext, createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { initialBooks, initialPeople, initialBookReferences, getBookReferencesForPerson } from "./DataManager";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import "./App.css";
import { PersonSearch } from "./PersonSearch";
import { CheckedOutBookList } from "./CheckedOutBookList";
import { ShowAllMembers } from "./ShowAllMembers";
import { CheckOut } from "./CheckOut";



function PassportVerification({ person }) {
    return <>This is the form</>;
}

function SignIn({ person }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (person.signedIn === true) {
        return (
            <>
                <strong>{person.name}</strong> is signed in.
            </>
        );
    }

    return (
        <>
            <Button onClick={handleShow} variant="primary">
                Sign In
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form id="passport-form" noValidate>
                    <Modal.Header>
                        <Modal.Title>Library Card Validation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert key="warning" variant="warning">
                            Ask {person.name} for their library card
                        </Alert>

                        <Form.Check type="switch" id="has-card-switch" label="Has Card" />
                        <Form.Label>Library Card Number</Form.Label>
                        <Form.Control
                            autoFocus
                            autoComplete="off"
                            type="text"
                            id="searchText"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Verify ID Number
                        </Button>

                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

function PersonDisplay({ person, books, dataFunctions }) {
    if (!person) {
        return null;
    }

    return (
        <>
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={person.image} />
                <Card.Body>
                    <Card.Title>{person.name}</Card.Title>
                    <Card.Text>{person.text}</Card.Text>
                    <CheckedOutBookList person={person} books={books} dataFunctions={dataFunctions} />
                    <SignIn person={person} />
                    &nbsp;
                    <br />
                    <br />
                    <CheckOut person={person} books={books} dataFunctions={dataFunctions} />
                </Card.Body>
            </Card>
        </>
    );
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
