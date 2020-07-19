import React, { useState, ChangeEvent } from "react";
import { useMutate } from "restful-react";
import { useHistory } from "react-router-dom";
import Loading from "components/Loading";
import { Button, Card, Form, FormGroup, Label, Col, Input } from "reactstrap";
import { User } from "models/user";

interface FormProps {
  user: User;
  method: "POST" | "PATCH";
}

export default function UserForm(props: FormProps) {
  const history = useHistory();

  const [user, setUser] = useState({ ...props.user });

  const path = user._id === undefined ? `/users` : `/users/${user._id}`;

  const SubmitUser = () => {
    const { mutate, loading, error } = useMutate({
      verb: props.method,
      path: path,
    });

    const submit = (e: React.MouseEvent) => {
      e.preventDefault();
      mutate({
        matricule: user.matricule,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        domaine: user.domaine,
        password: user.password,
        role: user.role,
      }).then(() => history.push("/admin/users"));
    };

    return (
      <React.Fragment>
        {error && <p>{error.message}</p>}
        {loading && <Loading />}
        {!loading && <Button onClick={submit}>Submit</Button>}
      </React.Fragment>
    );
  };

  const changeRole = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, role: e.target.value });

  return (
    <Card className='content-card'>
      <Form>
        <FormGroup row>
          <Label for='userMatricule' sm={2}>
            Matricule
          </Label>
          <Col sm={10}>
            <Input
              id='userMatricule'
              value={user.matricule}
              autoFocus={user._id === undefined}
              disabled={user._id !== undefined}
              onChange={(e) => setUser({ ...user, matricule: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='userPrenom' sm={2}>
            Prenom
          </Label>
          <Col sm={10}>
            <Input
              id='userPrenom'
              value={user.prenom}
              autoFocus={user._id !== undefined}
              onChange={(e) => setUser({ ...user, prenom: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='userNom' sm={2}>
            Nom
          </Label>
          <Col sm={10}>
            <Input
              id='userNom'
              value={user.nom}
              onChange={(e) => setUser({ ...user, nom: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='userEmail' sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              id='userEmail'
              value={user.email}
              disabled={user._id !== undefined}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='userDomaine' sm={2}>
            Domaine
          </Label>
          <Col sm={10}>
            <Input
              id='userDomaine'
              value={user.domaine}
              onChange={(e) => setUser({ ...user, domaine: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='userPassword' sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Input
              id='userPassword'
              value={user.password}
              disabled={user._id !== undefined}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Role</Label>
          <Col sm={10}>
            <FormGroup check inline>
              <Label check>
                <Input
                  type='radio'
                  value='admin'
                  checked={user.role === "admin"}
                  onChange={changeRole}
                />{" "}
                Admin
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type='radio'
                  value='atf'
                  checked={user.role === "atf"}
                  onChange={changeRole}
                />{" "}
                Atf
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <SubmitUser />
      </Form>
    </Card>
  );
}
