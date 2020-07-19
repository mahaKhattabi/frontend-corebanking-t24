import React from "react";
import { ApiTable } from "components/ApiTable";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { User } from "models/user";

export default function Users() {
  return (
    <React.Fragment>
      <Col md={7}>
        <ApiTable<User>
          thead={[
            { name: "Matricule" },
            { name: "Prenom" },
            { name: "Nom" },
            { name: "Email" },
            { name: "Role" },
          ]}
          tbody={(u) => (
            <>
              <td>
                <Link to={`/admin/users/${u._id}/edit`}>{u.matricule}</Link>
              </td>
              <td>{u.prenom}</td>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </>
          )}
          api={{
            get: `/users`,
            delete: { path: `/users`, id: (u) => u._id },
          }}
        />
      </Col>
      <Col md={2}>
        <Link to='/admin/users/create'>
          <Button className='create-button'>Create User</Button>
        </Link>
      </Col>
    </React.Fragment>
  );
}
