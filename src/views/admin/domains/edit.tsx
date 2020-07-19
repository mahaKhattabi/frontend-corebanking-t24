import React from "react";
import { Col } from "reactstrap";
import Form from "./_form";
import { Domain } from "models/database";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import ProcessRelations from "views/admin/relations/processes";
import TablesRelations from "views/admin/relations/tables";

export default function EditDomaine() {
  const { id } = useParams();
  const { data, loading, error } = useGet<Domain>(`/domaines/${id}`);

  return (
    <Col md={9}>
      {error && <p>{error.message}</p>}
      {loading && <Loading centerScreen>Loading domain info...</Loading>}
      {data && (
        <React.Fragment>
          <Form domain={data} method='PATCH' />
          <ProcessRelations
            collection={data.processus}
            api={{
              add: `/addProcToDomaines/${data._id}`,
              remove: `/removeProcFrmDomaines/${data._id}`,
            }}
          />
          <TablesRelations
            collection={data.tables}
            api={{
              add: `/addTabToDomaines/${data._id}`,
              remove: `/removeTabFrmDomaines/${data._id}`,
            }}
          />
        </React.Fragment>
      )}
    </Col>
  );
}
