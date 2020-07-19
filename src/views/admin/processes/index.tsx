import React from "react";
import { ApiTable } from "components/ApiTable";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Process } from "models/database";
import _ from "lodash";

export default function Processes() {
  return (
    <React.Fragment>
      <Col md={7}>
        <ApiTable<Process>
          thead={[{ name: "Name" }, { name: "Description" }]}
          tbody={(p) => (
            <>
              <td>
                <Link to={`/admin/process/${p._id}/edit`}>{p.nameP}</Link>
              </td>
              <td>{_.take(p.description, 50)}</td>
            </>
          )}
          api={{
            get: `/processus`,
            delete: { path: `/processus`, id: (p) => p._id },
          }}
        />
      </Col>
      <Col md={2}>
        <Link to='/admin/process/create'>
          <Button className='create-button'>Create Processus</Button>
        </Link>
      </Col>
    </React.Fragment>
  );
}
