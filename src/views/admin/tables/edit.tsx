import React from "react";
import { Col } from "reactstrap";
import Form from "./_form";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import { Table } from "models/database";
import DomainRelations from "views/admin/relations/domains";
import ProcessRelations from "views/admin/relations/processes";

export default function EditTable() {
  const { id } = useParams();
  const { data, loading, error } = useGet<Table>(`/tables/${id}`);

  return (
    <Col md={9}>
      {error && <p>{error.message}</p>}
      {loading && <Loading centerScreen>Loading table info...</Loading>}
      {data && (
        <React.Fragment>
          <Form table={data} method='PATCH' />
          <DomainRelations
            collection={data.domaines}
            api={{
              add: `/addDomToTables/${data._id}`,
              remove: `/removeDomFrmTables/${data._id}`,
            }}
          />
          <ProcessRelations
            collection={data.processus}
            api={{
              add: `/addProcToTables/${data._id}`,
              remove: `/removeProcFrmTables/${data._id}`,
            }}
          />
        </React.Fragment>
      )}
    </Col>
  );
}
