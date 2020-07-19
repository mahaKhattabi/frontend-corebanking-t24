import React from "react";
import Form from "./_form";
import { Col } from "reactstrap";
import { Table } from "models/database";

export default function CreateTable() {
  return (
    <Col md={9}>
      <Form table={{} as Table} method='POST' />
    </Col>
  );
}
