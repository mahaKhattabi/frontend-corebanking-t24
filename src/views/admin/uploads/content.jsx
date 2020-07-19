import React, { useState, useEffect } from "react";
import { Col, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";

export default function Tables() {
  const host = process.env.REACT_APP_HOST_PYTHON;
  const { name } = useParams();
  const { data, loading } = useGet(`${host}/table_content?name=${name}`);

  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (data) {
      let h = [];
      for (var attr in data.data[0]) {
        h.push(attr);
      }
      setHeaders(h);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Col md={7}>
        {loading && <Loading centerScreen>Loading files...</Loading>}
        {data && (
          <Table hover>
            <thead>
              <tr>
                {headers.map((h, k) => (
                  <th key={k}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.data.map((n, key) => (
                <tr key={key}>
                  {headers.map((h, key) => (
                    <td key={key}>{n[h]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </React.Fragment>
  );
}
