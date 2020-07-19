import React, { useState } from "react";
import { useMutate } from "restful-react";
import { useHistory } from "react-router-dom";
import Loading from "components/Loading";
import { Button, Card, Form, FormGroup, Label, Col, Input } from "reactstrap";
import { Process } from "models/database";

interface FormProps {
  process: Process;
  method: "POST" | "PATCH";
}

export default function ProcessForm(props: FormProps) {
  const history = useHistory();

  const [process, setProcess] = useState({ ...props.process });

  const path =
    process._id === undefined ? `/processus` : `/processus/${process._id}`;

  const SubmitProcess = () => {
    const { mutate, loading, error } = useMutate({
      verb: props.method,
      path: path,
    });

    const submit = (e: React.MouseEvent) => {
      e.preventDefault();
      mutate({
        nameP: process.nameP,
        description: process.description,
      }).then(() => history.push("/admin/process"));
    };

    return (
      <React.Fragment>
        {error && <p>{error.message}</p>}
        {loading && <Loading />}
        {!loading && <Button onClick={submit}>Submit</Button>}
      </React.Fragment>
    );
  };

  return (
    <Card className='content-card'>
      <Form>
        <FormGroup row>
          <Label for='processName' sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              autoFocus
              id='processName'
              value={process.nameP}
              onChange={(e) =>
                setProcess({ ...process, nameP: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='processDescription' sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              id='processDescription'
              type='textarea'
              value={process.description}
              onChange={(e) =>
                setProcess({ ...process, description: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <SubmitProcess />
      </Form>
    </Card>
  );
}
