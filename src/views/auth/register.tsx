import React, { useState, ChangeEvent } from "react";
import { Card, Form, FormGroup, Input, Button, Label } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { User } from "models/user";
import { useMutate } from "restful-react";
import Loading from "components/Loading";
import { successSubmit } from "views/auth/login";

export default function LoginForm() {
  const history = useHistory();
  const [user, setUser] = useState<User>({ role: "admin" } as User);

  const SubmitButton = () => {
    const { mutate, loading, error } = useMutate({
      verb: "POST",
      path: "/users",
    });

    const submit = (e: React.MouseEvent) => {
      e.preventDefault();
      mutate(user).then((resp) => {
        if (successSubmit(resp)) history.push("/admin");
      });
    };

    return (
      <React.Fragment>
        {loading && <Loading />}
        {error && <p>Unable to register user.</p>}
        {mutate && (
          <Button className='auth-submit' onClick={submit}>
            Register
          </Button>
        )}
      </React.Fragment>
    );
  };

  const changeRole = (e: ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, role: e.target.value });

  return (
    <div className='text-center'>
      <Card className='form-card centered'>
        <Form>
          <FormGroup>
            <h5>Create Account</h5>
          </FormGroup>
          <FormGroup>
            <Input
              autoFocus
              placeholder='Matricule'
              value={user.matricule}
              onChange={(e) => setUser({ ...user, matricule: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder='Prenom'
              value={user.prenom}
              onChange={(e) => setUser({ ...user, prenom: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder='Nom'
              value={user.nom}
              onChange={(e) => setUser({ ...user, nom: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='email'
              placeholder='Email'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              placeholder='Domaine'
              value={user.domaine}
              onChange={(e) => setUser({ ...user, domaine: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              placeholder='Password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </FormGroup>
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
          <SubmitButton />
          <p>
            Already have an account? <Link to='/auth/login'>Login here</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}
