import React from "react";
import Form from "./_form";
import { Col } from "reactstrap";
import { Process } from "models/database";

export default function CreateProcess() {
  return (
    <Col md={9}>
      <Form process={{} as Process} method='POST' />
    </Col>
  );
}
