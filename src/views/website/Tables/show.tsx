import React, { useState, useEffect, FunctionComponent } from "react";
import { useGet } from "restful-react";
import { Process, Table, Domain } from "models/database";
import _ from "lodash";
import Loading from "components/Loading";
import Heading from "components/Heading";

import { List as ListDomains } from "../Domains/index";
import { List as ListProcesses } from "../Processes/index";
import { useParams } from "react-router-dom";
import { ButtonGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";

declare var process: {
  env: {
    REACT_APP_HOST_PYTHON: string;
  };
};

export default function Show() {
  const { id } = useParams();
  const { data: table, loading } = useGet<Table>(`/tables/${id}`);

  const [filterDom, setFilterDom] = useState<Domain[]>([]);
  const [filterProc, setFilterProc] = useState<Process[]>([]);

  const [searchDom, setSearchDom] = useState("");
  const [searchProc, setSearchProc] = useState("");

  const [showTab, setShowTab] = useState(1);

  useEffect(() => {
    if (table)
      setFilterDom(
        table.domaines.filter((d) =>
          _.includes(d.nameD + d.description, searchDom)
        )
      );
  }, [table, searchDom]);

  useEffect(() => {
    if (table)
      setFilterProc(
        table.processus.filter((p) =>
          _.includes(p.nameP + p.description, searchProc)
        )
      );
  }, [table, searchProc]);

  const ButtonNav: FunctionComponent<{ nav: number }> = (props) => (
    <Button
      className={showTab === props.nav ? "nav-active" : "nav-blank"}
      onClick={() => setShowTab(props.nav)}
    >
      {props.children}
    </Button>
  );

  return (
    <React.Fragment>
      {loading && <Loading centerScreen>Loading table...</Loading>}
      {table && (
        <React.Fragment>
          <Heading
            header={table.nameT}
            content='Tables'
            description={
              <>
                {table.description}{" "}
                <Link to={`/tables/${table.nameT}/versions`}>versions</Link>
              </>
            }
            component={
              <ButtonGroup size='sm'>
                <ButtonNav nav={1}>Domaines</ButtonNav>
                <ButtonNav nav={2}>Processus</ButtonNav>
              </ButtonGroup>
            }
          />
          {showTab === 1 && (
            <ListDomains filtered={filterDom} setSearch={setSearchDom} />
          )}
          {showTab === 2 && (
            <ListProcesses filtered={filterProc} setSearch={setSearchProc} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
