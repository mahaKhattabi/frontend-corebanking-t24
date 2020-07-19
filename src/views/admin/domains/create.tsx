import React from "react";
import Form from "./_form";
import { Domain } from "models/database";
import { Col } from "reactstrap";

export default function CreateDomaine() {
  return (
    <Col md={9}>
      <Form domain={{} as Domain} method='POST' />
    </Col>
  );
}
