import React from "react";
import { Col } from "reactstrap";
import Form from "./_form";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import { User } from "models/user";

export default function EditUser() {
  const { id } = useParams();
  const { data, loading, error } = useGet<User>(`/users/${id}`);

  return (
    <Col md={9}>
      {error && <p>{error.message}</p>}
      {loading && <Loading centerScreen>Loading user info...</Loading>}
      {data && <Form user={data} method='PATCH' />}
    </Col>
  );
}
