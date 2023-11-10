import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

export function CheckedOutBookList({ person, books, dataFunctions}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const returnBook = (person, book) => {
        dataFunctions.removeBook(book.id);
    };

    const rows = [];

    const personBookReferences = books.filter(reference => reference.checkedOutByPersonId == person.id);

    personBookReferences.
    forEach((book) => {
        const overdue = book.overdue ? (
            <span class="badge bg-danger">overdue</span>
        ) : null;
        rows.push(
            <tr key="{book.id}">
                <td>
                    {overdue}
                    &nbsp;
                    {book.title}
                </td>
                <td>
                    <Button
                        variant="info"
                        size="sm"
                        onClick={() => {
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
    if (!personBookReferences) {
        return noBooksMessage;
    }
    if (!personBookReferences.length) {
        return noBooksMessage;
    }

    return (
        <>
            <span className="badge bg-secondary">{personBookReferences.length}</span> checked out
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
