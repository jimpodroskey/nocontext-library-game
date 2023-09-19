import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

import "./App.css";
import { PersonSearch } from "./PersonSearch";
import { CheckedOutBookList } from "./CheckedOutBookList";

function PassportVerification({ person }) {
  return <>This is the form</>;
}

function ShowAllMembers({ members }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rows = [];
  members.forEach((member) => {
    rows.push(
      <tr>
        <td>{member.name}</td>
        <td>{member.libraryCardId}</td>
      </tr>
    );
  });

  return (
    <>
      <Button onClick={handleShow} variant="link">
        Show all library cards
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Library Members</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Library Card Number</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function SignIn({ person }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(person);

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

const books = [
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

function PersonDisplay({ person }) {
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
          <CheckedOutBookList person={person} />
          <SignIn person={person} />
          &nbsp;
          <br />
          <br />
          <CheckOut person={person} />
        </Card.Body>
      </Card>
    </>
  );
}

function CheckOut({ person }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const checkoutButton = person.signedIn ? (
    <Button onClick={handleShow} variant="primary">
      Check out a book
    </Button>
  ) : null;

  const bookListRows = [];

  books.forEach((book) => {
    bookListRows.push(
      <tr>
        <td>
          <strong>{book.title}</strong>
          <br /> by {book.author}
        </td>
        <td>Checkout</td>
      </tr>
    );
  });

  return (
    <>
      {checkoutButton}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Book Check Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th>Book</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{bookListRows}</tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const initialPeople = [
  {
    name: "Caroline Ciliberti",
    image: "images/caroline.png",
    text: "Mom is the best person around",
    libraryCardId: "4618",
    books: []
  },
  {
    name: "Jim Podroskey",
    image: "images/jim.png",
    text: "Dad has a stinky butt",
    libraryCardId: "1565",
    books: []
  },
  {
    name: "Lily Dog",
    image: "images/lily.png",
    text: "I'll just go pee in the guest room",
    libraryCardId: "8740",
    books: []
  },
  {
    name: "Anna Podroskey",
    image: "images/anna.png",
    text: "Anna is the very best kid",
    libraryCardId: "9383",
    signedIn: true,
    books: [
      {
        title: "The Hobbit",
        overdue: true
      },
      {
        title: "Ivy and Bean: Doomed to Dance"
      }
    ]
  }
];

const fuzzySearch = (array, key, value) => {
  return array.filter((obj) => {
    const target = obj[key].toLowerCase();
    return target.includes(value.toLowerCase());
  });
};

function App() {
  const [people, setPeople] = useState(initialPeople);
  const [person, setPerson] = useState();

  function handleShowAll() {}

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
            <PersonDisplay person={person} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
