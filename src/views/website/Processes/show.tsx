import React, { useState, useEffect, FunctionComponent } from "react";
import { useGet } from "restful-react";
import { Process, Table, Domain } from "models/database";
import _ from "lodash";
import Loading from "components/Loading";
import Heading from "components/Heading";

import { List as ListDomains } from "../Domains/index";
import { List as ListTables } from "../Tables/index";
import { useParams } from "react-router-dom";
import { ButtonGroup, Button } from "reactstrap";

export default function Show() {
  const { id } = useParams();
  const { data: process, loading } = useGet<Process>(`/processus/${id}`);

  const [filterDom, setFilterDom] = useState<Domain[]>([]);
  const [filterTab, setFilterTab] = useState<Table[]>([]);

  const [searchDom, setSearchDom] = useState("");
  const [searchTab, setSearchTab] = useState("");

  const [showTab, setShowTab] = useState(1);

  useEffect(() => {
    if (process)
      setFilterDom(
        process.domaines.filter((d) =>
          _.includes(d.nameD + d.description, searchDom)
        )
      );
  }, [process, searchDom]);

  useEffect(() => {
    if (process && process.tables !== undefined)
      setFilterTab(
        process.tables.filter((t) =>
          _.includes(t.nameT + t.description, searchTab)
        )
      );
  }, [process, searchTab]);

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
      {loading && <Loading centerScreen>Loading processus...</Loading>}
      {process && (
        <React.Fragment>
          <Heading
            header={process.nameP}
            content='Processus'
            description={process.description}
            component={
              <ButtonGroup size='sm'>
                <ButtonNav nav={1}>Domaines</ButtonNav>
                <ButtonNav nav={2}>Tables</ButtonNav>
              </ButtonGroup>
            }
          />
          {showTab === 1 && (
            <ListDomains filtered={filterDom} setSearch={setSearchDom} />
          )}
          {showTab === 2 && (
            <ListTables filtered={filterTab} setSearch={setSearchTab} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
