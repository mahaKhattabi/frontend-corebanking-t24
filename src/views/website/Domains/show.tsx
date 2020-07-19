import React, { useState, useEffect, FunctionComponent } from "react";
import { useGet } from "restful-react";
import { Process, Table, Domain } from "models/database";
import _ from "lodash";
import Loading from "components/Loading";
import Heading from "components/Heading";

import { List as ListProcesses } from "../Processes/index";
import { List as ListTables } from "../Tables/index";
import { useParams } from "react-router-dom";
import { ButtonGroup, Button } from "reactstrap";

export default function Show() {
  const { id } = useParams();
  const { data: domain, loading } = useGet<Domain>(`/domaines/${id}`);

  const [filterProc, setFilterProc] = useState<Process[]>([]);
  const [filterTab, setFilterTab] = useState<Table[]>([]);

  const [searchProc, setSearchProc] = useState("");
  const [searchTab, setSearchTab] = useState("");

  const [showTab, setShowTab] = useState(1);

  useEffect(() => {
    if (domain)
      setFilterProc(
        domain.processus.filter((p) =>
          _.includes(p.nameP + p.description, searchProc)
        )
      );
  }, [domain, searchProc]);

  useEffect(() => {
    if (domain && domain.tables !== undefined)
      setFilterTab(
        domain.tables.filter((t) =>
          _.includes(t.nameT + t.description, searchTab)
        )
      );
  }, [domain, searchTab]);

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
      {loading && <Loading centerScreen>Loading domaines...</Loading>}
      {domain && (
        <React.Fragment>
          <Heading
            header={domain.nameD}
            content='Domaine'
            description={domain.description}
            component={
              <ButtonGroup size='sm'>
                <ButtonNav nav={1}>Processus</ButtonNav>
                <ButtonNav nav={2}>Tables</ButtonNav>
              </ButtonGroup>
            }
          />
          {showTab === 1 && (
            <ListProcesses filtered={filterProc} setSearch={setSearchProc} />
          )}
          {showTab === 2 && (
            <ListTables filtered={filterTab} setSearch={setSearchTab} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
