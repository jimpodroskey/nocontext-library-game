import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function PersonSearch({ onSubmit }) {
  const inputRef = useRef();
  const [value, setValue] = useState(""),
    onInput = ({ target: { value } }) => setValue(value),
    onFormSubmit = (e) => {
      e.preventDefault();
      onSubmit(value);
    };

  function clearForm() {
    setValue("");
    onSubmit("");
    inputRef.current.focus();
  }

  return (
    <>
      <Form id="search-form" noValidate onSubmit={onFormSubmit}>
        <Form.Label>Person's Name</Form.Label>
        <Form.Control
          ref={inputRef}
          autoFocus
          autoComplete="off"
          type="text"
          id="searchText"
          value={value}
          onChange={onInput}
        />
        <Form.Text id="passwordHelpBlock">
          Type the name of the person at the Library
        </Form.Text>
        <br />
        <Button type="submit">Search</Button>
        &nbsp;&nbsp;
        <Button variant="secondary" type="button" onClick={clearForm}>
          Clear
        </Button>
      </Form>
    </>
  );
}
