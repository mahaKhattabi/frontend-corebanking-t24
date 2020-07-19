import React, { useState } from "react";
import { Card, Form, FormGroup, Input, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { Login } from "models/user";
import { useMutate } from "restful-react";
import Loading from "components/Loading";

export const successSubmit = (resp: any) => {
  let response = resp as {
    user: { role: string; prenom: string; nom: string };
    token: string;
  };
  localStorage.setItem("token", response.token);
  localStorage.setItem("role", response.user.role);
  localStorage.setItem("nom", response.user.nom);
  localStorage.setItem("prenom", response.user.prenom);

  return true;
};

export default function LoginForm() {
  const history = useHistory();
  const [user, setUser] = useState<Login>({} as Login);

  const SubmitButton = () => {
    const { mutate, loading, error } = useMutate({
      verb: "POST",
      path: "/users/login",
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
        {error && <p>Login incorrect.</p>}
        {mutate && (
          <Button className='auth-submit' onClick={submit}>
            Login
          </Button>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className='text-center'>
      <Card className='form-card centered'>
        <Form>
          <FormGroup>
            <h5>Login</h5>
          </FormGroup>
          <FormGroup>
            <Input
              autoFocus
              id='matricleField'
              placeholder='Matricule'
              value={user.matricule}
              onChange={(e) => setUser({ ...user, matricule: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='password'
              id='passwordField'
              placeholder='Password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </FormGroup>
          <SubmitButton />
          <p>
            You dont have an account?{" "}
            <Link to='/auth/register'>Create one here</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}
