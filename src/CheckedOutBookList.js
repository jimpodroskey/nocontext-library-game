import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

export function CheckedOutBookList({ person }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const returnBook = (person, book) => {
    console.log(person.name);

    handleClose();
  };

  const rows = [];

  person.books.forEach((book) => {
    const overdue = book.overdue ? (
      <span class="badge bg-danger">overdue</span>
    ) : null;
    rows.push(
      <tr>
        <td>
          {overdue}
          &nbsp;
          {book.title}
        </td>
        <td>
          <Button
            variant="info"
            size="sm"
            onClick={(person, book) => {
              returnBook(person, book);
            }}
          >
            Return
          </Button>
        </td>
      </tr>
    );
  });

  const noBooksMessage = (
    <>
      <Alert variant="light" key="light">
        No books checked out
      </Alert>
    </>
  );
  if (!person.books) {
    return noBooksMessage;
  }
  if (!person.books.length) {
    return noBooksMessage;
  }

  return (
    <>
      <span class="badge bg-secondary">{person.books.length}</span> checked out
      books &nbsp;
      <Button onClick={handleShow} variant="info" size="sm">
        Return
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Checked Out Books</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th>Book</th>
                <th>Action</th>
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
