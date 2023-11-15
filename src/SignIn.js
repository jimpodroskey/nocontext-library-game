import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export function SignIn({ person, dataFunctions }) {
    const [show, setShow] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');


    const handleClose = () => {
        setShow(false);
        setValidationMessage("");
    }
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const libraryCardId = e.target.elements.libraryCardId.value;
        const hasCardSwitch = e.target.elements.hasCardSwitch.checked;
    
        if (libraryCardId.trim() === '' || !hasCardSwitch) {
          setValidationMessage('Please provide a library card ID and check the card switch.');
        } else {
          setValidationMessage('Form validated!'); // Replace this with your form submission logic
        }

        if (dataFunctions.verifyIdNumber(person.id, libraryCardId.trim())) {
            console.log("SIGNED IN");
            dataFunctions.signInPerson(person);
        }
    };

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
                <Form id="passport-form" noValidate onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Library Card Validation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert key="warning" variant="warning">
                            Ask {person.name} for their library card
                        </Alert>

                        <Form.Check type="switch" id="hasCardSwitch" label="Has Card" />
                        <Form.Label>Library Card Number</Form.Label>
                        <Form.Control
                            autoFocus
                            autoComplete="off"
                            type="text"
                            id="libraryCardId" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Verify ID Number
                        </Button>

                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                    <p>{validationMessage}</p>

                </Form>
            </Modal>
        </>
    );
}
