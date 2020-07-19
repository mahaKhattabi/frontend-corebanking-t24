import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import SortedTable from "components/SortedTable";
import { TableRow, TableCell } from "@material-ui/core";
import _ from "lodash";

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
    <Container>
      {loading && <Loading centerScreen>Loading files...</Loading>}
      {data && (
        <SortedTable
          data={data.data}
          thead={headers.map((h) => ({ name: h, sorted: true, key: h }))}
          tbody={(e, k) => (
            <TableRow hover role='checkbox' tabIndex={-1} key={k}>
              {headers.map((h, key) => (
                <TableCell component='th' scope='row' key={key}>
                  {e[h]}
                </TableCell>
              ))}
            </TableRow>
          )}
          sort={(data, order, key) => _.orderBy(data, [key], [order])}
        />
      )}
    </Container>
  );
}
