import React from "react";
import { Col, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import { defaults } from "../tables";
import _ from "lodash";

interface Content {
  data: string[];
}

declare var process: {
  env: {
    REACT_APP_HOST_PYTHON: string;
  };
};

export default function Tables() {
  const host = process.env.REACT_APP_HOST_PYTHON;
  const { data, loading } = useGet<Content>(`${host}/tables`);
  console.log(data);

  return (
    <React.Fragment>
      <Col md={7}>
        {loading && <Loading centerScreen>Loading files...</Loading>}
        {data && (
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.data
                .filter((t) => !_.includes(defaults, t))
                .map((n, key) => (
                  <tr key={key}>
                    <td>{n}</td>
                    <td className='text-right'>
                      <Link to={`/admin/contents/${n}/versions`}>Versions</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
      <Col md={2}>
        <Link to='/admin/contents/create'>
          <Button className='create-button'>Add Content</Button>
        </Link>
      </Col>
    </React.Fragment>
  );
}
