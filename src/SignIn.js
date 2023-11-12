import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export function SignIn({ person }) {
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
                            id="searchText" />
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
