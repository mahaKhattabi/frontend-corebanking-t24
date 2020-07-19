import React from "react";
import { ApiTable } from "components/ApiTable";
import { Domain } from "models/database";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";

export default function Domains() {
  return (
    <React.Fragment>
      <Col md={7}>
        <ApiTable<Domain>
          thead={[{ name: "Name" }, { name: "Description" }]}
          tbody={(d) => (
            <>
              <td>
                <Link to={`/admin/domains/${d._id}/edit`}>{d.nameD}</Link>
              </td>
              <td>{_.take(d.description, 50)}</td>
            </>
          )}
          api={{
            get: `/domaines`,
            delete: { path: `/domaines`, id: (d) => d._id },
          }}
        />
      </Col>
      <Col md={2}>
        <Link to='/admin/domains/create'>
          <Button className='create-button'>Create Domaine</Button>
        </Link>
      </Col>
    </React.Fragment>
  );
}
