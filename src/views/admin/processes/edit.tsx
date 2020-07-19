import React from "react";
import { Col } from "reactstrap";
import Form from "./_form";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import { Process } from "models/database";
import TablesRelations from "views/admin/relations/tables";
import DomainRelations from "views/admin/relations/domains";

export default function EditProcess() {
  const { id } = useParams();
  const { data, loading, error } = useGet<Process>(`/processus/${id}`);

  return (
    <Col md={9}>
      {error && <p>{error.message}</p>}
      {loading && <Loading centerScreen>Loading processus info...</Loading>}
      {data && (
        <React.Fragment>
          <Form process={data} method='PATCH' />
          <DomainRelations
            collection={data.domaines}
            api={{
              add: `/addDomToProc/${data._id}`,
              remove: `/removeDomFrmProc/${data._id}`,
            }}
          />
          <TablesRelations
            collection={data.tables}
            api={{
              add: `/addTabToProc/${data._id}`,
              remove: `/removeTabfrmProc/${data._id}`,
            }}
          />
        </React.Fragment>
      )}
    </Col>
  );
}
