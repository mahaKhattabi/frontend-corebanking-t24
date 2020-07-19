import React, {
  FunctionComponent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useGet } from "restful-react";
import Loading from "components/Loading";

import { PictureCard as ProcessCard } from "components/Cards";
import { Container, Row, Col, Button } from "reactstrap";
import { Process } from "models/database";
import _ from "lodash";

import SearchBar from "components/SearchBar";

export const List = (props: {
  filtered: Process[];
  setSearch: Dispatch<SetStateAction<string>>;
}) => (
  <React.Fragment>
    <Container className='container'>
      <SearchBar
        placeholder='Trouver une Processus'
        onChange={props.setSearch}
      />
    </Container>
    <Container className='container'>
      <Row md={3}>
        {props.filtered.map((d) => (
          <Col key={d._id}>
            <ProcessCard
              link={`/processes/${d._id}`}
              image={
                "https://images.unsplash.com/photo-1422393462206-207b0fbd8d6b?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=1000&q=80"
              }
              name={d.nameP}
              description={d.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  </React.Fragment>
);

const Processes: FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Process[]>([]);
  const { data: processes, loading, error, refetch } = useGet<Process[]>(
    `/processus`
  );

  useEffect(() => {
    if (processes)
      setFiltered(
        processes.filter((p) => _.includes(p.nameP + p.description, search))
      );
  }, [processes, search]);

  return (
    <React.Fragment>
      {loading && <Loading centerScreen>Loading processus...</Loading>}
      {error && <Button onClick={() => refetch()}>Load Processus</Button>}
      {processes && <List {...{ filtered, setSearch }} />}
    </React.Fragment>
  );
};

export default Processes;
