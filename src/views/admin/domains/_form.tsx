import React, { useState } from "react";
import { Domain } from "models/database";
import { useMutate } from "restful-react";
import { useHistory } from "react-router-dom";
import Loading from "components/Loading";
import { Button, Card, Form, FormGroup, Label, Col, Input } from "reactstrap";

interface FormProps {
  domain: Domain;
  method: "POST" | "PATCH";
}

export default function DomainForm(props: FormProps) {
  const history = useHistory();

  const [domain, setDomain] = useState({ ...props.domain });

  const path =
    domain._id === undefined ? `/domaines` : `/domaines/${domain._id}`;

  const SubmitDomain = () => {
    const { mutate, loading, error } = useMutate({
      verb: props.method,
      path: path,
    });

    const submit = (e: React.MouseEvent) => {
      e.preventDefault();
      mutate({
        nameD: domain.nameD,
        description: domain.description,
      }).then(() => history.push("/admin/domains"));
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
          <Label for='domainName' sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              autoFocus
              id='domainName'
              value={domain.nameD}
              onChange={(e) => setDomain({ ...domain, nameD: e.target.value })}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='domainDescription' sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              id='domainDescription'
              type='textarea'
              value={domain.description}
              onChange={(e) =>
                setDomain({ ...domain, description: e.target.value })
              }
            />
          </Col>
        </FormGroup>
        <SubmitDomain />
      </Form>
    </Card>
  );
}
