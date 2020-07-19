import React from "react";
import { Container } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import _ from "lodash";
import { VersionsContent } from "views/admin/uploads/versions";
import SortedTable from "components/SortedTable";
import { TableRow, TableCell } from "@material-ui/core";

declare var process: {
  env: {
    REACT_APP_HOST_PYTHON: string;
  };
};

export default function Tables() {
  const host = process.env.REACT_APP_HOST_PYTHON;
  const { name } = useParams();
  const { data, loading } = useGet<VersionsContent>(
    `${host}/table_versions?name=${name}`
  );
  console.log(data);

  return (
    <Container>
      {loading && <Loading centerScreen>Loading files...</Loading>}
      {data && (
        <SortedTable
          data={data.data}
          thead={[{ name: "Version", sorted: true }, { name: "" }]}
          tbody={(e, k) => (
            <TableRow hover role='checkbox' tabIndex={-1} key={k}>
              <TableCell component='th' scope='row'>
                <Link to={`/tables/${e}/content`}>{e}</Link>
              </TableCell>

              <TableCell align='right'>
                <a href={`${host}/table?name=${e}&format=xlsx`}>xlsx</a> |{" "}
                <a href={`${host}/table?name=${e}&format=csv`}>csv</a> |{" "}
                <a href={`${host}/table?name=${e}&format=json`}>json</a>
              </TableCell>
            </TableRow>
          )}
          sort={(data, order) => _.orderBy(data, [], [order])}
        />
      )}
    </Container>
  );
}
