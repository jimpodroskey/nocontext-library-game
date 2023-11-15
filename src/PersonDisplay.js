import React from "react";
import Card from "react-bootstrap/Card";
import { CheckedOutBookList } from "./CheckedOutBookList";
import { CheckOut } from "./CheckOut";
import { SignIn } from "./SignIn";

export function PersonDisplay({ person, books, dataFunctions }) {
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
                    <SignIn person={person} dataFunctions={dataFunctions} />
                    &nbsp;
                    <br />
                    <br />
                    <CheckOut person={person} books={books} dataFunctions={dataFunctions} />
                </Card.Body>
            </Card>
        </>
    );
}
