import React, {
  FunctionComponent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useGet } from "restful-react";
import Loading from "components/Loading";

import { PictureCard as TableCard } from "components/Cards";
import { Container, Row, Col, Button } from "reactstrap";
import { Table } from "models/database";
import _ from "lodash";
import SearchBar from "components/SearchBar";

export const List = (props: {
  filtered: Table[];
  setSearch: Dispatch<SetStateAction<string>>;
}) => (
  <React.Fragment>
    <Container className='container'>
      <SearchBar placeholder='Trouver une Table' onChange={props.setSearch} />
    </Container>
    <Container className='container'>
      <Row md={3}>
        {props.filtered.map((t) => (
          <Col key={t._id}>
            <TableCard
              link={`/tables/${t._id}`}
              name={t.nameT}
              description={t.description}
              image={
                "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=1004&q=80"
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  </React.Fragment>
);

const Tables: FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Table[]>([]);
  const { data: tables, loading, error, refetch } = useGet<Table[]>(`/tables`);

  useEffect(() => {
    if (tables)
      setFiltered(
        tables.filter((t) => _.includes(t.nameT + t.description, search))
      );
    console.log(tables);
  }, [tables, search]);

  return (
    <React.Fragment>
      {loading && <Loading centerScreen>Loading processus...</Loading>}
      {error && <Button onClick={() => refetch()}>Load Processus</Button>}
      {tables && <List {...{ filtered, setSearch }} />}
    </React.Fragment>
  );
};

export default Tables;
