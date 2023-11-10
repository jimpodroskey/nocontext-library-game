import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export function CheckOut({ person, books, dataFunctions }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const checkoutButton = person.signedIn ? (
    <Button onClick={handleShow} variant="primary">
      Check out a book
    </Button>
  ) : null;

  const bookListRows = [];

  const availableBooks = books.filter(book => !book.checkedOutByPersonId);

  availableBooks.forEach((book) => {
    bookListRows.push(
      <tr key="{book.id}">
        <td>
          <strong>{book.title}</strong>
          <br /> by {book.author}
        </td>
        <td>
          <Button
            variant="info"
            size="sm"
            onClick={() => { dataFunctions.addBook(book, person.id);handleClose() } }
          >
            Checkout
          </Button>
        </td>
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
