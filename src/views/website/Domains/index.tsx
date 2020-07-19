import React, {
  FunctionComponent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useGet } from "restful-react";
import Loading from "components/Loading";
import SearchBar from "components/SearchBar";

import { PictureCard as DomaineCard } from "components/Cards";
import { Container, Row, Col, Button } from "reactstrap";
import { Domain } from "models/database";
import _ from "lodash";

export const List = (props: {
  filtered: Domain[];
  setSearch: Dispatch<SetStateAction<string>>;
}) => (
  <React.Fragment>
    <Container className='container'>
      <SearchBar placeholder='Trouver une Domaine' onChange={props.setSearch} />
    </Container>
    <Container className='container'>
      <Row md={3}>
        {props.filtered.map((d) => (
          <Col key={d._id}>
            <DomaineCard
              link={`/domains/${d._id}`}
              image={`https://images.unsplash.com/photo-1464054313797-e27fb58e90a9?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=996&q=80`}
              name={d.nameD}
              description={d.description}
            />
          </Col>
        ))}
      </Row>
    </Container>
  </React.Fragment>
);

const Domains: FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Domain[]>([]);
  const { data: domaines, loading, error, refetch } = useGet<Domain[]>(
    `/domaines`
  );

  useEffect(() => {
    if (domaines)
      setFiltered(
        domaines.filter((d) => _.includes(d.nameD + d.description, search))
      );
  }, [domaines, search]);

  return (
    <React.Fragment>
      {loading && <Loading centerScreen>Loading domaines...</Loading>}
      {error && <Button onClick={() => refetch()}>Load Domaines</Button>}
      {domaines && <List {...{ filtered, setSearch }} />}
    </React.Fragment>
  );
};

export default Domains;
