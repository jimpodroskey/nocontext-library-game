import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

export function ShowAllMembers({ members }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rows = [];
  members.forEach((member) => {
    rows.push(
      <tr key={member.id}>
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
