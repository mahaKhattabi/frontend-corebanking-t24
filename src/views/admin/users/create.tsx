import React from "react";
import Form from "./_form";
import { Col } from "reactstrap";
import { User } from "models/user";

export default function CreateUser() {
  return (
    <Col md={9}>
      <Form user={{} as User} method='POST' />
    </Col>
  );
}
