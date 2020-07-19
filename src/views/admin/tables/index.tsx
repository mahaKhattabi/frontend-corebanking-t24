import React from "react";
import { ApiTable } from "components/ApiTable";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Table } from "models/database";
import _ from "lodash";

export const defaults = [
  "processus",
  "users",
  "domaines",
  "tables",
  "versions",
];

export default function Tables() {
  return (
    <React.Fragment>
      <Col md={7}>
        <ApiTable<Table>
          thead={[{ name: "Name" }, { name: "Description" }]}
          tbody={(t) => (
            <>
              <td>
                <Link to={`/admin/tables/${t._id}/edit`}>{t.nameT}</Link>
              </td>
              <td>{_.take(t.description, 50)}</td>
            </>
          )}
          api={{
            get: `/tables`,
            delete: { path: `/tables`, id: (t) => t._id },
          }}
        />
      </Col>
      <Col md={2}>
        <Link to='/admin/tables/create'>
          <Button className='create-button'>Create Table</Button>
        </Link>
      </Col>
    </React.Fragment>
  );
}
