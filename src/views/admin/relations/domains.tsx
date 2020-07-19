import React, { useState } from "react";
import { Card, DropdownItem, Table as TableElement, Button } from "reactstrap";
import { Domain } from "models/database";
import Autocomplete from "components/Autocomplete";
import _ from "lodash";
import { useMutate } from "restful-react";

interface DomainRelationsProps<T> {
  collection: Domain[];
  api: {
    add: string;
    remove: string;
  };
}

export default function DomainTable<T>(props: DomainRelationsProps<T>) {
  const [domaines, setDomaines] = useState(props.collection);

  const { mutate: add } = useMutate({
    path: props.api.add,
    verb: "PATCH",
  });

  const { mutate: remove } = useMutate({
    path: props.api.remove,
    verb: "PATCH",
  });

  const relate = (d: Domain) => {
    add({ domaines: d._id }).then(() => setDomaines([...domaines, d]));
  };

  const unrelate = (d: Domain) => {
    remove({ domaines: d._id }).then(() =>
      setDomaines(domaines.filter((dom) => dom !== d))
    );
  };

  const filter = (d: Domain, s: string) =>
    _.includes(d.nameD, s) &&
    !_.includes(
      domaines.map((e) => e._id),
      d._id
    );

  return (
    <Card className='content-card margin-top-30'>
      <Autocomplete<Domain, Domain>
        url={(s) => `/domaines`}
        option={(e) => (
          <DropdownItem onClick={() => relate(e)}>{e.nameD}</DropdownItem>
        )}
        optionFilter={filter}
        maxItems={10}
        placeholder='Link domaines by name'
      />
      <br />
      <TableElement hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {domaines.map((d, key) => (
            <tr key={key}>
              <td>{d.nameD}</td>
              <td>{_.take(d.description, 100)}</td>
              <td className='text-right'>
                <Button outline onClick={() => unrelate(d)}>
                  Unrelate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableElement>
    </Card>
  );
}
